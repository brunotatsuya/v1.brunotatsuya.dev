import Image from "next/image";

import { BlogPost } from "@/server/models/blog-posts";

type CoverProps = {
  post: BlogPost;
};

export default function Cover({ post }: CoverProps) {
  return (
    <Image
      className="card-img-post"
      src={post.coverImgurl || "/images/cover-placeholder.png"}
      alt={`Cover image for ${post.title}`}
      width={800}
      height={400}
      style={{ width: "100%", height: "400px" }}
    />
  );
}
