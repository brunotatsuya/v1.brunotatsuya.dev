import { notFound } from "next/navigation";

import {
  getPublishedPostBySlugAction,
  getPublishedPostsAction,
} from "@/actions/posts/fetch";

import Cover from "./components/cover";
import Article from "./components/article";

export { generateMetadata } from "./metadata";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { posts } = await getPublishedPostsAction();
  return posts.map((post) => ({ slug: post.slug }));
}

type BlogSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;

  const { post } = await getPublishedPostBySlugAction(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="d-flex justify-content-center bg-light pb-4" id="blogPost">
      <div className="card w-responsive mt-4 border-0">
        <Cover post={post} />
        <Article post={post} />
      </div>
    </div>
  );
}
