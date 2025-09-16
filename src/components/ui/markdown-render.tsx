import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import CodeBlock from "./code-block";

type MarkdownRenderProps = {
  markdown: string;
};

export default function MarkdownRender({ markdown }: MarkdownRenderProps) {
  return (
    <div className="markdown-body pt-4 pb-4">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
