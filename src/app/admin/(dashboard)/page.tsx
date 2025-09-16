import { getPostsAction } from "@/actions/posts/fetch";

import AddPostButton from "./components/add-post-button";
import PostsTable from "./components/posts-table";

export default async function AdminDashboardPage() {
  const { posts } = await getPostsAction();

  return (
    <div className="min-vh-100 bg-light2">
      <div className="container mt-5 pt-5">
        <div className="container bg-white pt-4 pb-2 round-border">
          <div className="d-flex mx-3 mb-3">
            <h4>Manage blog posts</h4>
            <AddPostButton />
          </div>
          <hr />
          <PostsTable posts={posts} />
          <hr />
        </div>
      </div>
    </div>
  );
}
