// data.ts — paste your blog content here, import in page.tsx

export type InlineImage = {
  id: string;
  src: string;          // path or URL to the image
  alt: string;          // alt text
  caption?: string;     // optional caption below the image
  afterBullet?: number; // same positioning logic as notes
};

export type InlineNote = {
  id: string;
  label: string;       // the one-liner shown collapsed, e.g. "📝 What is indexing?"
  content: string;     // the full explanation shown when expanded
  afterBullet?: number; // insert after bullet index (0-based). omit = after body text
};

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  relatedWriteups?: string[];
  articleLink?: string;
  sections: {
    heading: string;
    body: string;
    bullets?: string[];
    notes?: InlineNote[];   // ← expandable notes
    images?: InlineImage[]; // ← inline images
  }[];
};

export const posts: Post[] = [
  {
    slug: "kafka-consumer-groups",
    title: "Kafka Consumer Groups: What Finally Made It Click",
    category: "Engineering",
    date: "May 2026",
    readTime: "6 min read",
    summary:
      "My notes on partitions, offsets, rebalancing, and why consumer group design matters when building reliable async systems.",
    sections: [
      {
        heading: "The need for consumer groups",
        body: "Kafka consumer groups are the mechanism that allows multiple consumers to cooperate to consume a topic. Each partition is assigned to exactly one consumer in a group — this is the invariant that makes parallel processing safe.",
        bullets: [
          "A partition can be consumed by only one consumer in a group at a time.",
          "Adding more consumers than partitions leaves some consumers idle.",
          "Each group maintains its own set of offsets independently.",
        ],
        notes: [
          {
            id: "what-is-partition",
            label: "📝 What is a partition?",
            content:
              "A partition is an ordered, immutable sequence of records that is continually appended to. Think of it like a commit log. Kafka topics are split into N partitions — this is how Kafka achieves parallelism. More partitions = more throughput potential, but also more overhead. Each partition lives on a broker and can be replicated across others for fault tolerance.",
            afterBullet: 0, // appears after the first bullet
          },
        ],
      },
      {
        heading: "Offsets as a recovery map",
        body: "Offsets aren't just a cursor for reading — they're your recovery contract with the broker. When a consumer crashes and restarts, it picks up exactly from the last committed offset. Committing too rarely means reprocessing; committing too eagerly risks data loss on crash.",
        bullets: [
          "Offsets are the recovery map, not just a cursor.",
          "Auto-commit is convenient but dangerous for exactly-once semantics.",
          "Committing after processing (not before) is the safe default.",
        ],
      },
      {
        heading: "Rebalances and why they hurt",
        body: "A rebalance is triggered whenever consumers join or leave a group, or when partitions are added. During a rebalance, all consumption pauses. If your processing is slow, heartbeats time out, triggering unintended rebalances — a cascading problem.",
        bullets: [
          "Rebalances are normal, but slow processing makes them painful.",
          "Tune max.poll.interval.ms to match your actual processing time.",
          "Cooperative rebalancing (incremental) reduces stop-the-world pauses in newer Kafka clients.",
        ],
        notes: [
          {
            id: "what-is-heartbeat",
            label: "📝 What is a heartbeat in Kafka?",
            content:
              "Consumers send periodic heartbeats to the group coordinator broker to signal they're alive. If the coordinator doesn't receive a heartbeat within session.timeout.ms, it considers the consumer dead and triggers a rebalance. The heartbeat thread runs in the background — separate from your poll loop — which is why a slow poll() (blocking on processing) can cause missed heartbeats and unintended rebalances.",
            // no afterBullet = note appears right after the body text, before bullets
          },
        ],
      },
    ],
  },
  {
    slug: "logwatcher-realtime-logs",
    title: "Building LogWatcher: Lessons From Real-Time Logs",
    category: "Backend",
    date: "Apr 2026",
    readTime: "8 min read",
    summary:
      "What I learned while wiring Kafka, Elasticsearch, and WebSockets into a practical observability pipeline.",
    relatedWriteups: ["kafka-consumer-groups", "websocket-patterns"],
    sections: [
      {
        heading: "Parsing before indexing",
        body: "Raw logs are noisy. Indexing them as plain strings makes search nearly useless. The pipeline needs a parsing stage — structured fields like level, service, traceId, and timestamp — before anything hits Elasticsearch.",
        bullets: [
          "Parse logs before indexing so search stays useful.",
          "Use structured log formats (JSON) at the source when you control the emitter.",
          "A regex-based fallback parser handles legacy services.",
        ],
        notes: [
          {
            id: "what-is-indexing",
            label: "📝 What does indexing mean in Elasticsearch?",
            content:
              "Indexing is the act of storing a document in Elasticsearch so it can be searched. When you index a document, ES breaks its text into tokens (via an analyzer), stores them in an inverted index — a map from token → list of documents — and makes them queryable in near real-time (about 1 second by default). Without structured fields, you'd be searching across one big string blob, losing the ability to filter by level:error or service:auth efficiently.",
            afterBullet: 0,
          },
        ],
        images: [
          {
            id: "log-pipeline-arch",
            src: "/images/log-pipeline.png", // replace with your actual image path
            alt: "LogWatcher pipeline architecture diagram",
            caption: "Figure 1 — Log ingestion pipeline: Kafka → Parser → Elasticsearch → WebSocket",
            // no afterBullet = appears before bullets, after body text
          },
        ],
      },
      {
        heading: "Backpressure from day one",
        body: "The first version had no backpressure. Under load, the Kafka consumer outran the Elasticsearch indexer, memory spiked, and the service OOM'd. Backpressure has to be part of the first design, not a retrofit.",
        bullets: [
          "Backpressure needs to be part of the first design, not an afterthought.",
          "Bounded queues with blocking producers are a simple first step.",
          "Kafka's fetch.max.bytes and max.poll.records give you pull-based throttling for free.",
        ],
      },
      {
        heading: "WebSocket delivery guarantees",
        body: "The live tail UI looks impressive, but it's only as good as the delivery guarantees behind the WebSocket. Dropped connections, reconnects, and missed messages need explicit handling — a sequence number on each message lets the client detect gaps.",
        bullets: [
          "A live UI is only as good as the delivery guarantees behind it.",
          "Send a sequence number with every WebSocket frame.",
          "On reconnect, the client can request a replay from the last seen sequence.",
        ],
      },
    ],
  },
  {
    slug: "smart-contract-tests",
    title: "Notes on Writing Better Smart Contract Tests",
    category: "Web3",
    date: "Mar 2026",
    readTime: "5 min read",
    summary:
      "A short checklist I am building while learning Solidity testing, edge cases, and safer contract behavior.",
    articleLink: "https://book.getfoundry.sh/forge/tests",
    sections: [
      {
        heading: "Ownership and permission failures first",
        body: "The most costly bugs in deployed contracts are access control failures. Test those paths before anything else. Every function with onlyOwner, onlyRole, or a custom modifier needs a negative test — call it from an unauthorized address and assert it reverts.",
        bullets: [
          "Test ownership and permission failures first.",
          "Use vm.prank() in Foundry to impersonate arbitrary callers cleanly.",
          "A missing access check on an admin function is a protocol-ending vulnerability.",
        ],
      },
      {
        heading: "Fuzz numeric inputs",
        body: "Solidity arithmetic is exact but bounded. Overflow used to be silent; now it reverts — but edge cases around balances, timestamps, and token amounts still produce subtle bugs that unit tests with hardcoded values miss entirely.",
        bullets: [
          "Fuzz numeric inputs anywhere balances or timestamps are involved.",
          "Foundry's fuzz testing runs hundreds of random inputs automatically.",
          "Invariant tests go further: assert that global properties hold across any sequence of calls.",
        ],
      },
      {
        heading: "Events are part of the interface",
        body: "If your frontend or indexer depends on emitted events, they're part of your public interface — test them. An event with a wrong parameter or wrong ordering silently breaks downstream consumers without causing a revert.",
        bullets: [
          "Events are part of the interface when apps depend on them.",
          "Use vm.expectEmit() in Foundry to assert exact event shape.",
          "Index the right fields — only indexed parameters are queryable in logs.",
        ],
      },
    ],
  },
];

export const sidebarLinks = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
}));