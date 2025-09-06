import { getPublicPostsAction } from "@/actions/post.js";
import Footer from "@/components/footer.js";

import Navbar from "./components/navbar.js";
import PresentationCard from "./components/presentation-card.js";
import About from "./components/about.js";
import BlogPresentation from "./components/blog-presentation.js";
import Contact from "./components/contact.js";

export const revalidate = 3600; // 1 hour in seconds

export const viewport = {
  width: "device-width",
  initialScale: 1,
  shrinkToFit: "no",
};

export const metadata = {
  title: "Bruno Tatsuya",
  description:
    "Bruno Tatsuya is a computer scientist and software developer, who builds fancy and functional digital solutions. Also a hobby writer and composer.",
  keywords:
    "Bruno, Tatsuya, Masunaga, Santos, Software, Developer, Engineer, Computer, Scientist, Python, SQL, MongoDB, Flask, Javascript, JS, Nextjs, Next.js, React",
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

export default async function Page() {
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
