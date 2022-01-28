import Head from 'next/head'

import Navbar from '../../components/blog/navbar'
import Footer from '../../components/footer'
import Post from '../../components/blog/post'
import { getLastBlogPosts } from '../api/get-last-blog-posts'
import { getBlogPostBySlug } from '../api/get-blog-post-by-slug'

export default function PostPage(props) {
  const post = props.post;

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>{post.title} | tatsuya.blog</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <Post post={post}></Post>
      <Footer></Footer>
    </>
  );
}

// Static generated at build and server-side generation if doesnt exists
export async function getStaticPaths() {
  const posts = await getLastBlogPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
}

// Static generated with re-generate after 1 hour
export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.slug;
  const post = await getBlogPostBySlug(slug);
  return { props: { post }, revalidate: 3600 };
}