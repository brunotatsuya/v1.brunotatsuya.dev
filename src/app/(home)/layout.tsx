import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export { viewport, metadata } from "./metadata";

const navbarOptions = [
  { label: "about", href: "#about" },
  { label: "blog", href: "#blog" },
  { label: "contact", href: "#contact" },
  {
    label: "resume",
    href: "/resume.pdf",
    target: "_blank",
  },
];

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default async function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main>
      <Navbar options={navbarOptions} />
      {children}
      <Footer />
    </main>
  );
}
