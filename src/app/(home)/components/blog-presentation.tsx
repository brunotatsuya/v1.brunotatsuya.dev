import Link from "next/link";

import PostCardsList from "@/components/posts/post-cards-list";
import { BlogPost } from "@/server/models/blog-posts";
import AnimatedScroll from "@/components/ui/animated-scroll";

import SectionTitle from "./section-title";

type BlogPresentationProps = {
  posts: BlogPost[];
};

export default function BlogPresentation({ posts }: BlogPresentationProps) {
  return (
    <div className="bg-light2" id="blog">
      <div className="container w-90 align-items-center bottom-gap-3">
        <SectionTitle title="blog" animationDirection="right" />
        <AnimatedScroll
          type="zoom-in"
          duration={500}
          className="container font-monospace fs-6 text-center bottom-gap-3"
        >
          <Link href="/blog" className="left">
            view the archive
          </Link>
        </AnimatedScroll>
        <PostCardsList posts={posts} />
      </div>
    </div>
  );
}
