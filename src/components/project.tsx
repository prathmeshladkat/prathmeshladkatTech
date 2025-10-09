import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Github, Globe } from "lucide-react";

// Define the Project type
type ProjectType = {
  name: string;
  year: string;
  description: string;
  techStack: string[];
  websiteUrl?: string;
  sourceUrl?: string;
  status?: "ongoing" | "completed";
};

// Define props type for ProjectCard
type ProjectCardProps = {
  project: ProjectType;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="w-[305px] min-h-[260px] flex flex-col border rounded-2xl overflow-hidden bg-background">
      {/* HEADER */}
      <CardHeader className="py-2 px-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-base font-semibold text-left leading-tight mb-0">
              {project.name}
            </CardTitle>
            <p className="text-[11px] text-muted-foreground text-left mt-0">
              {project.year}
            </p>
          </div>
          {project.status === "ongoing" && (
            <Badge
              variant="default"
              className="text-[10px] font-medium px-2 py-0.5 bg-green-500 hover:bg-green-600 text-white shrink-0"
            >
              Ongoing
            </Badge>
          )}
        </div>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="flex flex-col justify-between flex-1 px-3 pb-3 pt-1">
        <div className="flex flex-col gap-1.5 overflow-hidden">
          <p className="text-xs text-muted-foreground leading-relaxed text-left">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1 mt-1">
            {project.techStack.map((tech: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-[10px] font-medium px-2 py-0.5"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {project.websiteUrl && (
            <Button
              asChild
              size="sm"
              className="gap-1.5 rounded-md h-7 text-xs"
            >
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-3 w-3" />
                Website
              </a>
            </Button>
          )}
          {project.sourceUrl && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="gap-1.5 rounded-md bg-transparent h-7 text-xs"
            >
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-3 w-3" />
                Source
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Project = () => {
  const projects: ProjectType[] = [
    {
      name: "LogWatcher",
      year: "2025",
      description:
        "Built LogWatcher — a production-grade log monitoring system simulating real-world observability pipelines. Designed end-to-end using Kafka, Elasticsearch, and WebSockets for real-time log streaming and search. Achieved scalable ingestion of high-volume logs with efficient parsing and indexing.",
      techStack: [
        "Next.js",
        "Tailwind CSS",
        "Kafka",
        "Node.js",
        "ElasticSearch",
        "Websocket",
      ],
      websiteUrl: "https://github.com/prathmeshladkat/LogWatcher",
      sourceUrl: "https://github.com/prathmeshladkat/LogWatcher",
      status: "completed",
    },
    {
      name: "Notification-microservice",
      year: "2025",
      description:
        "Developed a Notification Microservice capable of handling multi-channel notifications (Email, SMS, Push) using Kafka and Redis. Designed a distributed event-driven architecture ensuring reliability and scalability under load, simulating production-grade async processing.",
      techStack: ["Node.js", "TypeScript", "PostgreSQL", "Kafka", "Celery"],
      websiteUrl:
        "https://github.com/prathmeshladkat/notification-microservice",
      sourceUrl: "https://github.com/prathmeshladkat/notification-microservice",
      status: "completed",
    },
    {
      name: "BizzyBee",
      year: "2025",
      description:
        "Social networking platform enabling seamless connections through real-time interactions. BizzyBee allows users to send connection requests, build networks, and engage effectively. Built with scalable architecture, deployed on AWS EC2, and integrated with AWS SES for email notifications.",
      techStack: ["React.js", "MongoDB", "Node.js", "AWS EC2"],
      websiteUrl: "https://bizzybee.co.in/",
      sourceUrl: "https://github.com/prathmeshladkat/BizzyBee-Backend",
      status: "completed",
    },
    {
      name: "Dentalist",
      year: "2025",
      description:
        "Decentralized time capsule application on Monad testnet with 50+ stored memories and 99%+ data integrity. Users store and retrieve memories on-chain with timestamp verification and privacy controls.",
      techStack: ["Next.js", "TypeScript", "Solidity", "Monad Blockchain"],
      websiteUrl: "#",
      sourceUrl: "#",
      status: "ongoing",
    },
  ];

  return (
    <div className="w-full mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto text-center px-4">
        <Button>My Projects</Button>

        <span
          className="font-bold mb-2 leading-tight text-gray-900 dark:text-white whitespace-nowrap block mt-6"
          style={{ fontSize: "48px" }}
        >
          Check out my latest work
        </span>

        <h2
          className="text-gray-900 dark:text-gray-300 leading-relaxed mb-8"
          style={{ fontSize: "20px" }}
        >
          I&apos;ve worked on a variety of projects, from simple websites to
          complex web applications. Here are a few of my favorites.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center max-w-[640px] mx-auto">
          {projects.map((project: ProjectType, index: number) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
