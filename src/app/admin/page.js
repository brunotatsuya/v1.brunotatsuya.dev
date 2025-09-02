"use client";

import Head from "next/head";
import { useState, useEffect } from "react";

import Footer from "../../components/footer";
import AuthGuard from "../../components/auth-guard";

import Navbar from "./components/navbar";
import PostsTable from "./components/posts-table";

export default function AdminPage() {
  const [postsList, setPostsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const result = await response.json();
      setPostsList(result.data || []);
    };
    fetchPosts();
  }, []);

  const handleAddClick = () => {
    setIsLoading(true);
    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New post",
        isPublished: false,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setPostsList(postsList.concat(response.data));
        }
        setIsLoading(false);
      });
  };

  return (
    <AuthGuard showLoading={true}>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Admin | Bruno Tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Navbar />
      <div className="min-vh-100 bg-light2">
        <div className="container mt-5 pt-5">
          <div className="container bg-white pt-4 pb-2 round-border">
            <div className="d-flex mx-3 mb-3">
              <h4>Manage blog posts</h4>
              {isLoading ? (
                <button className="btn btn-primary btn-sm ms-auto" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm ms-auto"
                  onClick={handleAddClick}
                >
                  Create post
                </button>
              )}
            </div>
            <hr />
            <PostsTable postsList={postsList} setPostsList={setPostsList} />
            <hr />
          </div>
        </div>
      </div>
      <Footer />
    </AuthGuard>
  );
}
