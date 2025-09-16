"use client";

import Swal from "sweetalert2";
import { useState } from "react";

import { BlogPost } from "@/server/models/blog-posts";
import { updatePostAction } from "@/actions/posts/mutations";

type EditorProps = {
  post: BlogPost;
};

export default function Editor({ post }: EditorProps) {
  const [title, setTitle] = useState<string>(post.title);
  const [description, setDescription] = useState<string>(
    post.description || ""
  );
  const [coverImgurl, setCoverImgurl] = useState<string>(
    post.coverImgurl || ""
  );
  const [content, setContent] = useState<string>(post.content || "");

  const handleClick = (publish: boolean) => {
    const data = {
      title: title,
      description: description,
      coverImgurl: coverImgurl,
      content: content,
      datePublished: new Date().toISOString(),
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
      preConfirm: async () => {
        try {
          await updatePostAction(post.id, data);
          return true;
        } catch {
          Swal.showValidationMessage("Request failed");
        }
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

  return (
    <>
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
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </>
  );
}
