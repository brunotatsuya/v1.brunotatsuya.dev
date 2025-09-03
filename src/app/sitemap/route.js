import { getAllPublicPostsAction } from "@/actions/post.js";

export async function GET() {
  const result = await getAllPublicPostsAction();
  const posts = result.success ? result.data : [];

  const blogUrls = posts.map((post) => ({
    loc: "https://brunotatsuya.dev/blog/" + post.slug,
    lastmod: post.datePublished,
  }));

  const standardUrls = [
    {
      loc: "https://brunotatsuya.dev",
      lastmod: new Date().toISOString(),
    },
    {
      loc: "https://brunotatsuya.dev/blog",
      lastmod: new Date().toISOString(),
    },
  ];

  const allUrls = standardUrls.concat(blogUrls);

  // Create sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
