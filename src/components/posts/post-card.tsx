import Link from "next/link";
import Image from "next/image";
import { BsPencilSquare } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";

import { BlogPost } from "@/server/models/blog-posts";
import MotionDiv from "@/components/ui/motion-div";

type PostCardProps = {
  post: BlogPost;
};

export default function PostCard({ post }: PostCardProps) {
  const datePublished = new Date(post.datePublished);
  return (
    <MotionDiv whileHover={{ scale: 1.1 }}>
      <Link href={"/blog/" + post.slug} className="text-black">
        <div className="card">
          <Image
            className="card-img-top"
            src={post.coverImgurl}
            alt={`Cover image`}
            width={400}
            height={200}
            style={{
              width: "400px",
              height: "200px",
              objectFit: "cover",
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-subtitle">{post.description}</p>
          </div>
          <div className="card-footer bg-light">
            <div className="text-muted">
              <small>
                <BsPencilSquare /> {post.author}{" "}
              </small>
              <small className="mx-2">
                <MdDateRange />{" "}
                {datePublished.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </small>
            </div>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
}
