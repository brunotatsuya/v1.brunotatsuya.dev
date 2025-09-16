"use client";

import { useState } from "react";

import { createPostAction } from "@/actions/posts/mutations";

export default function AddPostButton() {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    await createPostAction({
      title: "New post",
      content: "",
      isPublished: false,
    });
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <button className="btn btn-primary btn-sm ms-auto" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </button>
      ) : (
        <button className="btn btn-primary btn-sm ms-auto" onClick={onClick}>
          Create post
        </button>
      )}
    </>
  );
}
