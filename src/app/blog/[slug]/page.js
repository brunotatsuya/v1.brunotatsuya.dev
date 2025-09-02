"use client";

import Head from "next/head";
import { useState, useEffect, use } from "react";

import Footer from "../../../components/footer";
import { Post } from "../components/post";
import { Navbar } from "../components/navbar";

export default function BlogPostPage({ params }) {
  const { slug } = use(params);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/by-slug/${slug}`);
      const result = await response.json();
      setPost(result.data);
    };
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title} | Bruno Tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="title" content={post.title + " | Bruno Tatsuya"} />
        <meta name="description" content={post.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta charset="utf-8" />

        {/* Open Graph Facebook */}
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={"https://brunotatsuya.dev/blog/" + post.slug}
        />
        <meta property="og:title" content={post.title + " | Bruno Tatsuya"} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.coverImgurl} />

        {/* Open Graph Linkedin */}
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:type"
          content="article"
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:url"
          content={"https://brunotatsuya.dev/blog/" + post.slug}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:title"
          content={post.title + " | Bruno Tatsuya"}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:description"
          content={post.description}
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:image"
          content={post.coverImgurl}
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={"https://brunotatsuya.dev/blog/" + post.slug}
        />
        <meta
          property="twitter:title"
          content={post.title + " | Bruno Tatsuya"}
        />
        <meta property="twitter:description" content={post.description} />
        <meta property="twitter:image" content={post.coverImgurl} />
      </Head>
      <Navbar />
      <Post post={post} />
      <Footer />
    </>
  );
}
