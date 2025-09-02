"use client";

import Head from "next/head";
import { useState, useEffect } from "react";

import Footer from "../../components/footer";

import { Navbar } from "./components/navbar";
import { PostCards } from "./components/post-cards";

export default function BlogIndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts/public");
      const result = await response.json();
      setPosts(result.data || []);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Blog | Bruno Tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="min-vh-100 container mt-5 pt-5 w-90">
          <PostCards posts={posts} />
        </div>
        <Footer />
      </main>
    </>
  );
}
