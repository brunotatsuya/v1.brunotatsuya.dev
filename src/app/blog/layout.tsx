import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export { viewport, metadata } from "./metadata";

const navbarOptions = [{ label: "go to homepage", href: "/" }];

type BlogLayoutProps = {
  children: React.ReactNode;
};

export default async function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <main>
      <Navbar options={navbarOptions} />
      {children}
      <Footer />
    </main>
  );
}
