import Footer from "../components/footer";

import { getPublicPostsAction } from "./actions/server-actions.js";
import Navbar from "./components/navbar";
import PresentationCard from "./components/presentation-card";
import About from "./components/about";
import BlogPresentation from "./components/blog-presentation";
import Contact from "./components/contact";

export const revalidate = 3600; // 1 hour in seconds

export const metadata = {
  title: "Bruno Tatsuya",
  description:
    "Bruno Tatsuya is a computer scientist and software developer, who builds fancy and functional digital solutions. Also a hobby writer and composer.",
  keywords:
    "Bruno, Tatsuya, Masunaga, Santos, Software, Developer, Engineer, Computer, Scientist, Python, SQL, MongoDB, Flask, Javascript, JS, Nextjs, Next.js, React",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
  verification: {
    google: "sL23D9PQlVxT_dObPJKM21_-P8hx7c-nCvIwf83Y3gw",
  },
  openGraph: {
    type: "website",
    url: "https://brunotatsuya.dev",
    title: "Bruno Tatsuya",
    description:
      "Bruno Tatsuya is a computer scientist and software developer, who builds fancy and functional digital solutions. Also a hobby writer and composer.",
    images: [
      {
        url: "https://brunotatsuya.dev/images/og.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://brunotatsuya.dev",
    title: "Bruno Tatsuya",
    description:
      "Bruno Tatsuya is a computer scientist and software developer, who builds fancy and functional digital solutions. Also a hobby writer and composer.",
    images: ["https://brunotatsuya.dev/images/og.jpg"],
  },
};

async function getPosts() {
  const result = await getPublicPostsAction(3);
  return result.success ? result.data : [];
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main>
      <Navbar />
      <PresentationCard />
      <About />
      <BlogPresentation posts={posts} />
      <Contact />
      <Footer />
    </main>
  );
}
