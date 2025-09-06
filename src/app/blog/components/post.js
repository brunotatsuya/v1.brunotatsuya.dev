import Image from "next/image";
import { BsPencilSquare } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";

import { MarkdownRender } from "./markdown-render";

function PostComponent({ post }) {
  const datePublished = new Date(post.datePublished);
  return (
    <div className="d-flex justify-content-center bg-light pb-4" id="blogPost">
      <div className="card w-responsive mt-4 border-0">
        <Image
          className="card-img-post"
          src={post.coverImgurl}
          alt={`Cover image for ${post.title}`}
          width={800}
          height={400}
          style={{ width: "100%", height: "auto" }}
        />
        <article className="pt-4 mx-4">
          <h2 className="display-6">{post.title}</h2>
          <span className="text-muted">{post.description}</span>
          <br></br>
          <div className="mt-3">
            <small className="text-muted">
              <BsPencilSquare /> {post.author}{" "}
            </small>
            <small className="text-muted mx-2">
              <MdDateRange />{" "}
              {datePublished.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </small>
          </div>

          <MarkdownRender markdown={"---\n" + post.content} />
        </article>
      </div>
    </div>
  );
}

export { PostComponent as Post };
