export async function getAllPostsApi(adminOnly = false, limit = 1000) {
  try {
    const queryParams = new URLSearchParams();
    if (adminOnly) queryParams.set("admin", "true");
    if (limit !== 1000) queryParams.set("limit", limit.toString());

    const url = `/api/posts?${queryParams.toString()}`;

    const response = await fetch(url, {
      credentials: "include",
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

export async function getPostByIdApi(id) {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      credentials: "include",
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

export async function getPostBySlugApi(slug, publishedOnly = true) {
  try {
    const queryParams = new URLSearchParams();
    if (!publishedOnly) queryParams.set("published", "false");

    const response = await fetch(
      `/api/posts/slug/${slug}?${queryParams.toString()}`,
      {
        credentials: "include",
      }
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
      credentials: "include",
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
      credentials: "include",
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
      credentials: "include",
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
