import "bootstrap/dist/css/bootstrap.css";
import "aos/dist/aos.css";
import "nprogress/nprogress.css";
import "../../public/Lato.css";
import "../../public/Montserrat.css";
import "../styles/globals.css";
import "../styles/github-syntax-highlight.css";
import "../styles/github-markdown.css";

import ClientLayout from "./client-layout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
