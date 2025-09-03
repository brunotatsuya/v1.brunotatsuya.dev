import Footer from "../../components/footer";
import { PostService } from "../../server/services/post-service.js";

import { Navbar } from "./components/navbar";
import { PostCards } from "./components/post-cards";

export const revalidate = 3600; // 1 hour in seconds

export const metadata = {
  title: "Blog | Bruno Tatsuya",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
};

async function getPosts() {
  try {
    const postService = new PostService();
    const posts = await postService.getPublicPosts();
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <main>
      <Navbar />
      <div className="min-vh-100 container mt-5 pt-5 w-90">
        <PostCards posts={posts} />
      </div>
      <Footer />
    </main>
  );
}
