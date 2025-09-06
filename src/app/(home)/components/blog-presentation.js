import Link from "next/link";

import { PostCards } from "@/app/blog/components/post-cards";

export default function BlogPresentation({ posts }) {
  return (
    <div className="bg-light2" id="blog">
      <div className="container w-90 align-items-center bottom-gap-3">
        <span
          className="display-5 d-flex justify-content-center title-section"
          data-aos="fade-right"
          data-aos-duration="500"
        >
          blog
        </span>
        <div
          className="d-flex justify-content-center"
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-duration="500"
        >
          <div className="divider-title-section bottom-gap-3"></div>
        </div>
        <div
          className="container font-monospace fs-6 text-center bottom-gap-3"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <Link href="/blog" className="left">
            view the archive
          </Link>
        </div>
        <PostCards posts={posts}></PostCards>
      </div>
    </div>
  );
}
