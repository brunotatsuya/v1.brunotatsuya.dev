import Head from 'next/head'

import Navbar from '../../components/blog/navbar'
import Footer from '../../components/footer'
import Post from '../../components/blog/post'
import { getLastBlogPosts } from '../api/posts'
import { getBlogPostBySlug } from '../api/posts/[_id]'

export default function PostPage(props) {
  const post = props.post;

  return (
    <>
      <Head>
        <title>{post.title} | Bruno Tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="title" content={post.title + " | Bruno Tatsuya"}  />
        <meta name="description" content={post.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta charset="utf-8" />

        {/* Open Graph Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={"https://brunotatsuya.dev/blog/" + post.slug} />
        <meta property="og:title" content={post.title + " | Bruno Tatsuya"} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.coverImgurl} />
        
        {/* Open Graph Linkedin */}
        <meta prefix="og: http://ogp.me/ns#" property="og:type" content="article" />
        <meta prefix="og: http://ogp.me/ns#" property="og:url" content={"https://brunotatsuya.dev/blog/" + post.slug} />
        <meta prefix="og: http://ogp.me/ns#" property="og:title" content={post.title + " | Bruno Tatsuya"} />
        <meta prefix="og: http://ogp.me/ns#" property="og:description" content={post.description} />
        <meta prefix="og: http://ogp.me/ns#" property="og:image" content={post.coverImgurl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={"https://brunotatsuya.dev/blog/" + post.slug} />
        <meta property="twitter:title" content={post.title + " | Bruno Tatsuya"} />
        <meta property="twitter:description" content={post.description} />
        <meta property="twitter:image" content={post.coverImgurl} />
      </Head>
      <Navbar></Navbar>
      <Post post={post}></Post>
      <Footer></Footer>
    </>
  );
}

// Static generated at build and server-side generation if doesnt exists
export async function getStaticPaths() {
  const posts = await getLastBlogPosts({});
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: 'blocking' };
}

// Static generated with re-generate after 1 hour
export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.slug;
  const post = await getBlogPostBySlug(slug);
  return { props: { post }, revalidate: 3600 };
}