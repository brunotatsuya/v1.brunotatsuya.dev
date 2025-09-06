import { getAllPublicPostsAction } from "@/actions/post.js";
import Footer from "@/components/footer";

import { Navbar } from "./components/navbar";
import { PostCards } from "./components/post-cards";

export const revalidate = 3600; // 1 hour in seconds

export const viewport = {
  width: "device-width",
  initialScale: 1,
  shrinkToFit: "no",
};

export const metadata = {
  title: "Blog | Bruno Tatsuya",
};

async function getPosts() {
  const result = await getAllPublicPostsAction();
  return result.success ? result.data : [];
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
