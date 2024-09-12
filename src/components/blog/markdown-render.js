import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import CodeBlock from './code-block'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

export default function MarkdownRender({ markdown }) {
  return (
    <ReactMarkdown className="markdown-body pt-4 pb-4" rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} components={CodeBlock}>{markdown}</ReactMarkdown>
  ) 
}