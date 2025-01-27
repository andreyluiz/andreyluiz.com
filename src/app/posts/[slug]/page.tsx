import { Markdown } from "@/components/Markdown";
import { Navigation } from "@/components/Navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  return {
    title: post?.title || "Post not found",
  };
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug((await params).slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <article className="container mx-auto px-6 py-12 max-w-3xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <time className="text-neutral-400 flex items-center">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <Icon icon="mdi:dot" className="size-4" />
            by Andrey Luiz
          </time>
        </header>
        <Markdown content={post.content} />
      </article>
    </>
  );
}
