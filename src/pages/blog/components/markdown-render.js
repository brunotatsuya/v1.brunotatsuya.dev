import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { CodeBlock } from "./code-block";

function MarkdownRenderComponent({ markdown }) {
  return (
    <ReactMarkdown
      className="markdown-body pt-4 pb-4"
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={CodeBlock}
    >
      {markdown}
    </ReactMarkdown>
  );
}

// Default export for Next.js page compatibility
export default function MarkdownRenderPage() {
  return (
    <div>This is a component file, not meant to be accessed as a page.</div>
  );
}

// Named export for actual usage
export { MarkdownRenderComponent as MarkdownRender };
