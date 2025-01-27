import { GroupedPosts } from '@/lib/posts';
import Link from 'next/link';

interface PostListProps {
  posts: GroupedPosts;
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="w-full space-y-12">
      {Object.entries(posts)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, months]) => (
          <div key={year} className="space-y-6">
            {Object.entries(months).map(([month, posts]) => (
              <div key={month} className="space-y-4">
                <h4 className="text-xl text-neutral-400">{month} {year}</h4>
                <ul className="space-y-2">
                  {posts.map((post) => (
                    <li key={post.slug} className="gap-2">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="text-lg hover:text-blue-500 transition-colors"
                      >
                        {post.title}
                      </Link>
                      &nbsp;
                      <span className="text-sm text-neutral-400">{post.lead}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
} 