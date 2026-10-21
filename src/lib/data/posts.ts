import { posts as postContent } from "@/lib/content/posts";

export type PostListItem = {
  slug: string;
  title: string;
  date: string;
  editedAt?: string;
  summary?: string;
  tags: string[];
  hosted: string;
  canonical_url?: string;
  cover_image?: string;
};

/** All posts, newest first. */
export async function listPosts(): Promise<PostListItem[]> {
  return [...postContent]
    .filter((p) => p.date)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      editedAt: p.editedAt ?? undefined,
      summary: p.summary ?? undefined,
      tags: Array.isArray(p.tags) ? p.tags : [],
      hosted: p.hosted,
      canonical_url: p.canonical_url ?? undefined,
      cover_image: p.cover_image,
    }));
}

/** Posts sharing the most tags with the given post, newest first. */
export async function getRelatedPosts(
  slug: string,
  tags: readonly string[],
  limit = 3,
): Promise<PostListItem[]> {
  const all = await listPosts();
  const others = all.filter((p) => p.slug !== slug);
  const scored = others.map((post) => ({
    post,
    shared: post.tags.filter((t) => tags.includes(t)).length,
  }));
  scored.sort(
    (a, b) =>
      b.shared - a.shared ||
      new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
  );
  return scored.slice(0, limit).map((s) => s.post);
}

/** A single post with its body, or null when the slug doesn't exist. */
export async function getPostBySlug(slug: string) {
  const post = postContent.find((p) => p.slug === slug);
  if (!post) return null;
  return {
    ...post,
    slug,
  };
}
