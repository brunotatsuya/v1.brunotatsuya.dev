import {
  getPublishedPostBySlugAction,
  getAllPublishedSlugsAction,
} from "@/actions/post.js";
import Footer from "@/components/footer";

import { Post } from "../components/post";
import { Navbar } from "../components/navbar";

async function getPost(slug) {
  const result = await getPublishedPostBySlugAction(slug);
  return result.success ? result.data : null;
}

export async function generateStaticParams() {
  const result = await getAllPublishedSlugsAction();
  return result.success ? result.data : [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Bruno Tatsuya",
    };
  }

  return {
    title: `${post.title} | Bruno Tatsuya`,
    description: post.description,
    openGraph: {
      type: "article",
      url: `https://brunotatsuya.dev/blog/${post.slug}`,
      title: `${post.title} | Bruno Tatsuya`,
      description: post.description,
      images: [post.coverImgurl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Bruno Tatsuya`,
      description: post.description,
      images: [post.coverImgurl],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Navbar />
      <Post post={post} />
      <Footer />
    </>
  );
}
