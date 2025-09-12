import "bootstrap/dist/css/bootstrap.css";
import "aos/dist/aos.css";
import "../../public/Lato.css";
import "../../public/Montserrat.css";
import "@/styles/globals.css";
import "@/styles/github-syntax-highlight.css";
import "@/styles/github-markdown.css";

import ClientLayout from "./client-layout";

export { metadata } from "./metadata";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
