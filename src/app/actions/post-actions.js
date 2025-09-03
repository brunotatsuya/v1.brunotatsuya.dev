export async function getAllPostsApi(adminOnly = false, limit = 1000) {
  try {
    const queryParams = new URLSearchParams();
    if (adminOnly) queryParams.set("admin", "true");
    if (limit !== 1000) queryParams.set("limit", limit.toString());

    const response = await fetch(`/api/posts?${queryParams.toString()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

export async function getPostByIdApi(id) {
  try {
    const response = await fetch(`/api/posts/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

export async function getPostBySlugApi(slug, publishedOnly = true) {
  try {
    const queryParams = new URLSearchParams();
    if (!publishedOnly) queryParams.set("published", "false");

    const response = await fetch(
      `/api/posts/slug/${slug}?${queryParams.toString()}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

export async function createPostApi(postData) {
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

export async function updatePostApi(id, updateData) {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

export async function deletePostApi(id) {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}
