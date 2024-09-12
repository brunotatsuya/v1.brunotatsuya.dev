import Head from 'next/head'

import Navbar from '../components/index/navbar'
import PresentationCard from '../components/index/presentation-card'
import About from '../components/index/about'
import BlogPresentation from '../components/index/blog-presentation'
import Contact from '../components/index/contact'
import Footer from '../components/footer'
import { getLastBlogPosts } from './api/posts'

export default function Index(props) {
  return (
    <>
      <Head>
        <title>Bruno Tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="title" content="Bruno Tatsuya" />
        <meta name="description" content="Bruno Tatsuya is a computer scientist and software developer, who builds fancy and functional digital solutions. Also a hobby writer and composer." />
        <meta name="keywords" content="Bruno, Tatsuya, Masunaga, Santos, Software, Developer, Engineer, Computer, Scientist, Python, SQL, MongoDB, Flask, Javascript, JS, Nextjs, Next.js, React" /> 
        <meta name="google-site-verification" content="sL23D9PQlVxT_dObPJKM21_-P8hx7c-nCvIwf83Y3gw" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta charset="utf-8" />
        
        {/* Open Graph */}
        <meta prefix="og: http://ogp.me/ns#" property="og:type" content="website" />
        <meta prefix="og: http://ogp.me/ns#" property="og:url" content="https://brunotatsuya.dev" />
        <meta prefix="og: http://ogp.me/ns#" property="og:title" content="Bruno Tatsuya" />
        <meta prefix="og: http://ogp.me/ns#" property="og:description" content="Bruno Tatsuya is a computer scientist and software developer, who builds fancy and functional digital solutions. Also a hobby writer and composer. " />
        <meta prefix="og: http://ogp.me/ns#" property="og:image" content="https://brunotatsuya.dev/images/og.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://brunotatsuya.dev" />
        <meta property="twitter:title" content="Bruno Tatsuya" />
        <meta property="twitter:description" content="Bruno Tatsuya is a computer scientist and software developer, who builds fancy and functional digital solutions. Also a hobby writer and composer. " />
        <meta property="twitter:image" content="https://brunotatsuya.dev/images/og.jpg" />
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
  const posts = await getLastBlogPosts({limit: 3});
  return { props: { posts }, revalidate: 3600 };
}