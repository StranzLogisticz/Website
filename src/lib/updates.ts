import fs from "fs";
import path from "path";
import matter from "gray-matter";

const UPDATES_DIR = path.join(process.cwd(), "content/updates");

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  image: string;
  author: string;
};

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(UPDATES_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(UPDATES_DIR, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      tag: data.tag ?? "General",
      excerpt: data.excerpt ?? "",
      image: data.image ?? "/img/contract-bg.png",
      author: data.author ?? "Stranz Logistics",
    } satisfies ArticleMeta;
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticle(slug: string): { meta: ArticleMeta; content: string } {
  const filepath = path.join(UPDATES_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      tag: data.tag ?? "General",
      excerpt: data.excerpt ?? "",
      image: data.image ?? "/img/contract-bg.png",
      author: data.author ?? "Stranz Logistics",
    },
    content,
  };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(UPDATES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
