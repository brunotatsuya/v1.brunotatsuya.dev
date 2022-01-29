import Head from 'next/head'

import Navbar from '../components/index/navbar'
import PresentationCard from '../components/index/presentation-card'
import About from '../components/index/about'
import BlogPresentation from '../components/index/blog-presentation'
import Contact from '../components/index/contact'
import Footer from '../components/footer'
import { getLastBlogPosts } from './api/get-last-blog-posts'

export default function Index(props) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="google-site-verification" content="sL23D9PQlVxT_dObPJKM21_-P8hx7c-nCvIwf83Y3gw" />
        <title>Bruno Tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <main>
        <Navbar></Navbar>
        <PresentationCard></PresentationCard>
        <About></About>
        <BlogPresentation posts={props.posts}></BlogPresentation>
        <Contact></Contact>
        <Footer></Footer>
      </main>
    </>
  )
}

// Static generated with re-generate after 1 hour
export async function getStaticProps() {
  const posts = await getLastBlogPosts(3);
  return { props: { posts }, revalidate: 3600 };
}