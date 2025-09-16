import { getPublishedPostsAction } from "@/actions/posts/fetch";

import PresentationCard from "./components/presentation-card";
import About from "./components/about";
import BlogPresentation from "./components/blog-presentation";
import Contact from "./components/contact";

export default async function Page() {
  const { posts } = await getPublishedPostsAction(3);

  return (
    <>
      <PresentationCard />
      <About />
      <BlogPresentation posts={posts} />
      <Contact />
    </>
  );
}
