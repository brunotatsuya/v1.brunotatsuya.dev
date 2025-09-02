import { getLastBlogPosts } from "../posts";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send("Only GET requests are allowed");
    return;
  }

  try {
    const posts = await getLastBlogPosts({ onlyPublished: true });
    res.status(200).json({ success: true, data: posts });
    return;
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch posts: " + error.message,
    });
    return;
  }
}
