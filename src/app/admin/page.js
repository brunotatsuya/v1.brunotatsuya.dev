"use client";

import { useState, useEffect } from "react";

import { getAllPostsApi, createPostApi } from "@/actions/post-api";
import AuthGuard from "@/components/auth-guard";
import Footer from "@/components/footer";

import Navbar from "./components/navbar";
import PostsTable from "./components/posts-table";

export default function AdminPage() {
  const [postsList, setPostsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getAllPostsApi(true);
        if (result.success) {
          setPostsList(result.data || []);
        } else {
          console.error("Failed to fetch posts:", result.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddClick = async () => {
    setIsLoading(true);
    const response = await createPostApi({
      title: "New post",
      content: "",
      isPublished: false,
    });

    if (response.success) {
      setPostsList(postsList.concat(response.data));
    }
    setIsLoading(false);
  };

  return (
    <AuthGuard showLoading={true}>
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
