"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import type { ArticleMeta } from "@/lib/updates";

type Props = {
  articles: ArticleMeta[];
  tags: string[];
  tagColors: Record<string, string>;
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export default function UpdatesClient({ articles, tags, tagColors }: Props) {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All" ? articles : articles.filter((a) => a.tag === activeTag);

  return (
    <section className="py-14 md:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTag === tag
                  ? "bg-[#013364] text-white shadow-[0_4px_16px_rgba(1,51,100,0.2)]"
                  : "bg-white border border-[#e2e8f0] text-[#475569] hover:text-[#013364] hover:border-[#013364]/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((article, i) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="group rounded-2xl bg-white border border-[#e2e8f0] overflow-hidden flex flex-col
                           hover:border-[#FF8C00]/30 hover:shadow-[0_4px_28px_rgba(255,140,0,0.1)]
                           transition-all duration-300"
              >
                {/* Cover image */}
                <div className="relative h-48 bg-[#f8fafc] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Tag badge over image */}
                  <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1
                                    rounded-full border tracking-wider uppercase backdrop-blur-sm
                                    ${tagColors[article.tag] ?? "text-gray-700 bg-white/80 border-gray-200"}`}>
                    {article.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.date)}
                  </div>

                  <h3 className="text-base font-bold text-[#013364] leading-snug
                                 group-hover:text-[#FF8C00] transition-colors duration-200 flex-1">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[#475569] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="pt-3 border-t border-[#e2e8f0] mt-auto">
                    <Link
                      href={`/updates/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF8C00]
                                 hover:gap-3 transition-all duration-200"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center text-[#94a3b8] py-20 text-sm">
            No articles in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
