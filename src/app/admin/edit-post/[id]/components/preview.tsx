import Cover from "@/components/posts/render/cover";
import Article from "@/components/posts/render/article";
import { BlogPost } from "@/server/models/blog-posts";

type PreviewProps = {
  post: BlogPost;
};

export default function Preview({ post }: PreviewProps) {
  return (
    <div className="container mt-4 pb-5">
      <div className="container bg-white overflow-auto max-vh-50">
        <div className="card mt-4 border-0">
          <Cover post={post} />
          <Article post={post} />
        </div>
      </div>
    </div>
  );
}
