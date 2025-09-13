import { getPublishedPostsAction } from "@/actions/posts/fetch";
import PostCardsList from "@/components/post-cards-list";

export { metadata, viewport } from "./metadata";

export default async function BlogIndexPage() {
  const { posts } = await getPublishedPostsAction();

  return (
    <div className="min-vh-100 container mt-5 pt-5 w-90">
      <PostCardsList posts={posts} />
    </div>
  );
}
