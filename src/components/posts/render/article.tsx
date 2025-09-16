import { BsPencilSquare } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";

import MarkdownRender from "@/components/ui/markdown-render";
import { BlogPost } from "@/server/models/blog-posts";

type ArticleProps = {
  post: BlogPost;
};

export default function Article({ post }: ArticleProps) {
  const datePublished = new Date(post.datePublished!);
  return (
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
  );
}
