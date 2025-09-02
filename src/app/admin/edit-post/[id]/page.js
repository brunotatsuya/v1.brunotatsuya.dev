"use client";

import Head from "next/head";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";

import Navbar from "../../components/navbar";
import Footer from "../../../../components/footer";
import { MarkdownRender } from "../../../blog/components/markdown-render";
import AuthGuard from "../../../../components/auth-guard";
import { generateSlug } from "../../../../services/slug";
import { useLeavePageConfirm } from "../../../../services/custom-hooks";
export default function EditPostPage({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);
  const datePublished = new Date();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImgurl, setCoverImgurl] = useState("");

  useLeavePageConfirm();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const result = await response.json();
      const fetchedPost = result.data;
      setPost(fetchedPost);
      setContent(fetchedPost.content);
      setTitle(fetchedPost.title);
      setDescription(fetchedPost.description);
      setCoverImgurl(fetchedPost.coverImgurl);
    };
    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleClick = (publish) => {
    const data = {
      slug: generateSlug(title),
      title: title,
      description: description,
      coverImgurl: coverImgurl,
      content: content,
      datePublished: new Date(),
      author: "Bruno Tatsuya",
      isPublished: publish,
    };

    Swal.fire({
      title: "Please, confirm",
      text: publish
        ? "You are publishing this post"
        : "You are saving this post without publish",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return fetch("/api/posts/" + post._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((response) => {
            if (!response.success) {
              throw new Error(response.message);
            }
            return response;
          })
          .catch((error) => {
            Swal.showValidationMessage(error);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Post saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <AuthGuard showLoading={false}>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Edit post | Bruno Tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Navbar />

      <div className="bg-light2 min-vh-100">
        <div className="container mt-5 pt-5">
          <div className="d-flex bd-highlight mb-3">
            <h4 className="me-auto p-2 bd-highlight">Edit post</h4>
            <button
              className="btn btn-primary btn-sm mx-2 p-2 bd-highlight"
              onClick={() => handleClick(true)}
            >
              Publish post
            </button>
            <button
              className="btn btn-secondary btn-sm p-2 bd-highlight"
              onClick={() => handleClick(false)}
            >
              Save post
            </button>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              className="form-control mb-2"
              placeholder="description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="url"
              className="form-control"
              placeholder="cover image url"
              value={coverImgurl}
              required
              onChange={(e) => setCoverImgurl(e.target.value)}
            />
          </div>
        </div>

        <div className="container mt-4">
          <textarea
            className="form-control no-resize"
            rows="12"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="container mt-4 pb-5" overflow="scroll">
          <div className="container bg-white overflow-auto max-vh-50">
            <div className="card mt-4 border-0">
              <img className="card-img-post" src={coverImgurl} />
              <article className="pt-4 mx-4">
                <h2 className="display-6">{title}</h2>
                <span className="text-muted">{description}</span>
                <br></br>
                <div className="mt-3">
                  <small className="text-muted">
                    <BsPencilSquare /> Bruno Tatsuya{" "}
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
                <MarkdownRender markdown={"---\n" + content} />
              </article>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </AuthGuard>
  );
}
