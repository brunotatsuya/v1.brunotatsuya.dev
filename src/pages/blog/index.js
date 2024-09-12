import Head from 'next/head'

import Navbar from '../../components/blog/navbar'
import Footer from '../../components/footer'
import PostCards from '../../components/blog/post-cards'
import { getLastBlogPosts } from '../api/posts'

export default function Index(props) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Blog | Bruno Tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <main>
        <Navbar></Navbar>
        <div className="min-vh-100 container mt-5 pt-5 w-90">
        <PostCards posts={props.posts}></PostCards>
        </div>
        <Footer></Footer>
      </main>
    </>
  )
}

// Static generated with re-generate after 1 hour
export async function getStaticProps() {
  const posts = await getLastBlogPosts({});
  return { props: { posts }, revalidate: 3600 }
}