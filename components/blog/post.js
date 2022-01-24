import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeHighlight from 'rehype-highlight'

import { BsPencilSquare } from 'react-icons/bs'
import { MdDateRange } from 'react-icons/md'

export default function Post({ post }) {
  const datePublished = new Date(post.datePublished);
  return (
    <div className="d-flex justify-content-center bg-light pb-4" id="blogPost">
      <div className="card w-responsive mt-4 border-0">
        <img className="card-img-post" src={post.coverImgurl} />
        <article className="pt-4 mx-5">
          <h2 className="display-6">{post.title}</h2>
          <span className="text-muted">{post.description}</span>
          <br></br>
          <div className="mt-3">
            <small className="text-muted"><BsPencilSquare /> {post.author} </small>
            <small className="text-muted mx-2"><MdDateRange /> {datePublished.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</small>
          </div>
          <ReactMarkdown className="markdown-body pt-5 pb-4" rehypePlugins={[rehypeHighlight]}>{post.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  )
}