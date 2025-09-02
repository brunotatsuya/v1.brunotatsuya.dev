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

export { MarkdownRenderComponent as MarkdownRender };
