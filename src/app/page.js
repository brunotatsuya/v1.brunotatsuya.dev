"use client";

import Head from "next/head";
import { useState, useEffect } from "react";

import Footer from "../components/footer";

import Navbar from "./components/navbar";
import PresentationCard from "./components/presentation-card";
import About from "./components/about";
import BlogPresentation from "./components/blog-presentation";
import Contact from "./components/contact";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts/public");
      const result = await response.json();
      setPosts(result.data?.slice(0, 3) || []);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Bruno Tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="title" content="Bruno Tatsuya" />
        <meta
          name="description"
          content="Bruno Tatsuya is a computer scientist and software developer, who builds fancy and functional digital solutions. Also a hobby writer and composer."
        />
        <meta
          name="keywords"
          content="Bruno, Tatsuya, Masunaga, Santos, Software, Developer, Engineer, Computer, Scientist, Python, SQL, MongoDB, Flask, Javascript, JS, Nextjs, Next.js, React"
        />
        <meta
          name="google-site-verification"
          content="sL23D9PQlVxT_dObPJKM21_-P8hx7c-nCvIwf83Y3gw"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta charset="utf-8" />

        {/* Open Graph */}
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:type"
          content="website"
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:url"
          content="https://brunotatsuya.dev"
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:title"
          content="Bruno Tatsuya"
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:description"
          content="Bruno Tatsuya is a computer scientist and software developer, who builds fancy and functional digital solutions. Also a hobby writer and composer. "
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:image"
          content="https://brunotatsuya.dev/images/og.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://brunotatsuya.dev" />
        <meta property="twitter:title" content="Bruno Tatsuya" />
        <meta
          property="twitter:description"
          content="Bruno Tatsuya is a computer scientist and software developer, who builds fancy and functional digital solutions. Also a hobby writer and composer. "
        />
        <meta
          property="twitter:image"
          content="https://brunotatsuya.dev/images/og.jpg"
        />
      </Head>

      <main>
        <Navbar />
        <PresentationCard />
        <About />
        <BlogPresentation posts={posts} />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
