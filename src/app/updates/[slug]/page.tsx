import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticle, getAllSlugs } from "@/lib/updates";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { meta } = getArticle(slug);
    return { title: `${meta.title} | Stranz Logistics`, description: meta.excerpt };
  } catch {
    return { title: "Article Not Found" };
  }
}

const tagColors: Record<string, string> = {
  Network:     "text-blue-700 bg-blue-50 border-blue-100",
  Technology:  "text-cyan-700 bg-cyan-50 border-cyan-100",
  Fleet:       "text-orange-700 bg-orange-50 border-orange-100",
  Partnership: "text-purple-700 bg-purple-50 border-purple-100",
  Facility:    "text-green-700 bg-green-50 border-green-100",
  General:     "text-gray-700 bg-gray-50 border-gray-100",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let meta, content;
  try {
    ({ meta, content } = getArticle(slug));
  } catch {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-24">

      {/* Cover image */}
      <div className="relative h-64 md:h-[420px] w-full bg-[#f8fafc]">
        <Image
          src={meta.image}
          alt={meta.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#013364]/70 via-[#013364]/20 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back link */}
        <Link
          href="/updates"
          className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#013364]
                     transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Updates
        </Link>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border tracking-wider uppercase
                            ${tagColors[meta.tag] ?? "text-gray-700 bg-gray-50 border-gray-100"}`}>
            {meta.tag}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(meta.date)}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
            <User className="w-3.5 h-3.5" />
            {meta.author}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#013364] leading-tight mb-4">
          {meta.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-[#475569] leading-relaxed mb-10 pb-10 border-b border-[#e2e8f0]">
          {meta.excerpt}
        </p>

        {/* MDX body */}
        <div className="prose prose-lg prose-slate max-w-none
                        prose-headings:text-[#013364] prose-headings:font-bold
                        prose-a:text-[#FF8C00] prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-[#013364]
                        prose-li:text-[#475569]
                        prose-p:text-[#475569] prose-p:leading-relaxed
                        prose-table:text-sm prose-th:text-[#013364] prose-th:bg-[#f8fafc]
                        prose-td:text-[#475569]">
          <MDXRemote source={content} />
        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-10 border-t border-[#e2e8f0] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#013364] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Updates
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8C00] text-white
                       font-semibold rounded-xl hover:bg-[#E07800] transition-all duration-300
                       hover:shadow-[0_4px_16px_rgba(255,140,0,0.35)] text-sm"
          >
            Get in Touch
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
