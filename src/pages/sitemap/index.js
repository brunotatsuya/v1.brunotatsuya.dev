import { getServerSideSitemap } from 'next-sitemap'

import { getLastBlogPosts } from '../api/posts'

export async function getServerSideProps(context) {
  const posts = await getLastBlogPosts({});

  const blogUrls = posts.map((post) => ({loc: 'https://brunotatsuya.dev/blog/' + post.slug,  lastmod: post.datePublished}));

  const standardUrls = [
    {
      loc: 'https://brunotatsuya.dev',
      lastmod: new Date().toISOString(),
    },
    {
      loc: 'https://brunotatsuya.dev/blog',
      lastmod: new Date().toISOString(),
    },
  ]

  return getServerSideSitemap(context, standardUrls.concat(blogUrls))
}

// Default export to prevent next.js errors
export default () => {}