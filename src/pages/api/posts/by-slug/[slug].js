import { getBlogPostBySlug } from "../[_id]";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send("Only GET requests are allowed");
    return;
  }

  const { slug } = req.query;

  try {
    const post = await getBlogPostBySlug(slug);
    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }
    res.status(200).json({ success: true, data: post });
    return;
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch post: " + error.message,
    });
    return;
  }
}
