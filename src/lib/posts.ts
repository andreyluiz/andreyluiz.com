import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface Post {
  slug: string;
  title: string;
  lead: string;
  date: string;
  content: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  lead: string;
  date: string;
}

export interface GroupedPosts {
  [year: string]: {
    [month: string]: PostMeta[];
  };
}

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Assuming filename format: YYYY-MM-DD-slug.md
      const [year, month, day, ...slugParts] = fileName
        .replace(".md", "")
        .split("-");
      const date = `${year}-${month}-${day}`;
      const slug = slugParts.join("-");

      return {
        slug,
        title: data.title || slug,
        lead: data.lead || "",
        date,
        content,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function groupPostsByDate(): GroupedPosts {
  const posts = getAllPosts();
  const grouped: GroupedPosts = {};

  posts.forEach((post) => {
    const [year, month] = post.date.split("-");
    const monthName = new Date(`${year}-${month}-01`).toLocaleString("en-US", {
      month: "long",
    });

    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][monthName]) {
      grouped[year][monthName] = [];
    }

    grouped[year][monthName].push({
      slug: post.slug,
      title: post.title,
      lead: post.lead,
      date: post.date,
    });
  });

  return grouped;
}
