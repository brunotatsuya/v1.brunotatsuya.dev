import "bootstrap/dist/css/bootstrap.css";
import "aos/dist/aos.css";
import "../../public/Lato.css";
import "../../public/Montserrat.css";
import "../styles/globals.css";
import "../styles/github-syntax-highlight.css";
import "../styles/github-markdown.css";

import ClientLayout from "./client-layout";

export const metadata = {
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({ children }) {
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
