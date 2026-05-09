"use client";

import DockNavbar from "@/components/navbar";
import { posts, sidebarLinks } from "@/data/blog"; // ← your data file
import { cn } from "@/lib/utils";
import { CalendarDays, ExternalLink, List, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogPage() {
  const [activeSlug, setActiveSlug] = useState(posts[0].slug);
  const [searchQuery, setSearchQuery] = useState("");

  const activePost = posts.find((p) => p.slug === activeSlug) ?? posts[0];

  const filteredSidebar = sidebarLinks.filter((l) =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="relative flex min-h-screen w-full bg-[#1a1b1e] text-[#c9d1d9] font-mono">
      {/* ── LEFT SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-[240px] shrink-0 border-r border-[#2d2f34] h-screen sticky top-0 overflow-y-auto">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#2d2f34]">
          <Link href="/" className="text-white font-bold text-base tracking-tight block">
            Prathmesh&apos;s Notes
          </Link>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-[#2d2f34]">
          <div className="flex items-center gap-2 bg-[#25262b] rounded-md px-3 py-2">
            <Search className="size-3.5 text-[#6e7681] shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-[#c9d1d9] placeholder:text-[#6e7681] outline-none w-full"
            />
          </div>
        </div>

        {/* CONTENT label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681]">
            Content
          </p>
        </div>

        {/* Blog list — flat, no tree */}
        <nav className="flex-1 px-3 pb-6 space-y-0.5">
          {filteredSidebar.map((link) => (
            <button
              key={link.slug}
              onClick={() => setActiveSlug(link.slug)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-md text-sm leading-snug transition-colors",
                activeSlug === link.slug
                  ? "bg-[#2d2f34] text-white"
                  : "text-[#8b949e] hover:bg-[#25262b] hover:text-[#c9d1d9]"
              )}
            >
              {link.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <section className="flex-1 min-w-0 overflow-y-auto h-screen">
        <div className="max-w-[720px] px-10 py-8">
        {/* Post header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white leading-snug mb-4">
            {activePost.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#6e7681] mb-4">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {activePost.date}
            </span>
            <span>{activePost.readTime}</span>
            <span className="bg-[#25262b] border border-[#2d2f34] px-2.5 py-0.5 rounded-full text-[#8b949e]">
              {activePost.category}
            </span>
          </div>

          {/* Related writeups */}
          {activePost.relatedWriteups && activePost.relatedWriteups.length > 0 && (
            <p className="text-sm text-[#8b949e] mb-2">
              <span className="text-[#6e7681]">related writeups :</span>{" "}
              {activePost.relatedWriteups.map((rw) => (
                <span
                  key={rw}
                  className="text-[#c9d1d9] cursor-pointer hover:text-[#58a6ff]"
                  onClick={() => setActiveSlug(rw)}
                >
                  [[{rw}]]{" "}
                </span>
              ))}
            </p>
          )}

          {/* External article link */}
          {activePost.articleLink && (
            <a
              href={activePost.articleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#58a6ff] hover:underline mb-4"
            >
              article link <ExternalLink className="size-3" />
            </a>
          )}

          {/* Summary */}
          <p className="text-sm leading-7 text-[#8b949e]">{activePost.summary}</p>
        </header>

        {/* Divider */}
        <hr className="border-[#2d2f34] mb-8" />

        {/* Sections */}
        <div className="space-y-10">
          {activePost.sections.map((section) => (
            <div
              key={section.heading}
              id={section.heading.toLowerCase().replace(/\s+/g, "-")}
            >
              <h2 className="text-base font-bold text-white mb-3">
                {section.heading}
              </h2>
              <p className="text-sm leading-7 text-[#8b949e] mb-4">
                {section.body}
              </p>
              {section.bullets && (
                <ul className="space-y-2">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-[#c9d1d9]">
                      <span className="mt-2 size-1.5 rounded-full bg-[#58a6ff] shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ── RIGHT SIDEBAR — headings of active post ── */}
      <aside className="hidden xl:flex flex-col w-[220px] shrink-0 border-l border-[#2d2f34] h-screen sticky top-0 px-5 py-8">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-4">
          <List className="size-3.5" />
          On this page
        </div>
        <nav className="space-y-1">
          {activePost.sections.map((section, i) => (
            <a
              key={section.heading}
              href={`#${section.heading.toLowerCase().replace(/\s+/g, "-")}`}
              className={cn(
                "block text-sm py-2 px-3 rounded-md leading-snug transition-colors",
                i === 0
                  ? "bg-[#1c3a5e] text-[#58a6ff] border-l-2 border-[#58a6ff]"
                  : "text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#25262b]"
              )}
            >
              {section.heading}
            </a>
          ))}
        </nav>
      </aside>

      {/* Dock nav */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <DockNavbar />
      </div>
    </main>
  );
}