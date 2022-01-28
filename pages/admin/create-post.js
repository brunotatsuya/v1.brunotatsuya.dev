import Head from 'next/head'
import Swal from 'sweetalert2'
import { useState } from 'react'

import Navbar from '../../components/admin/navbar'
import Footer from '../../components/footer'
import MarkdownRender from "../../components/blog/markdown-render"
import { generateSlug } from '../../services/slug'
import { AuthGuard } from '../../services/auth'

function fire(title, description, coverImgurl, content) {
  const post = {
    slug: generateSlug(title),
    title,
    description,
    coverImgurl,
    content,
    datePublished: new Date(),
    author: "Bruno Tatsuya"
  };

  Swal.fire({
    title: 'Please, input passcode to complete',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (passcode) => {
      post.passcode = passcode;
      return fetch('/api/create-blog-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      }).then(response => response.json())
        .then(response => {
          if (!response.ok) {
            throw new Error(response.message);
          }
          return response.json();
        })
        .catch(error => {
          Swal.showValidationMessage(error)
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Post saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
  })
}

export default function CreatePost(props) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImgurl, setCoverImgurl] = useState('');

  return (
    <div>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Create post | tatsuya.admin</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Navbar></Navbar>

      <div className="input-group pt-4 mt-5 mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">title</span>
        </div>
        <input type="text"
          className="form-control"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
      </div>
      <span className="display-6">Logged as {props.userAuthenticated}</span>
      <div className="input-group pt-4 mt-5 mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">description</span>
        </div>
        <input type="text"
          className="form-control"
          placeholder="title"
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">coverImgurl</span>
        </div>
        <input type="text"
          className="form-control"
          placeholder="title"
          value={coverImgurl}
          onChange={(e) => setCoverImgurl(e.target.value)} />
      </div>

      <div className="container pt-5 min-vh-100">
        <div className="d-flex justify-content-center vh-75">
          <textarea className="w-50 mx-2 no-resize"
            value={content}
            onChange={(e) => setContent(e.target.value)} />
          <div className="w-50 mx-2 overflow-auto">
            <MarkdownRender markdown={`# ${title}\n${content}`} highlight={false} />
          </div>
        </div>
      </div>

      <div className="text-center w-100 mb-5">
        <button className="btn btn-primary" onClick={(e) => fire(title, description, coverImgurl, content)}>
          Submit
        </button>

      </div>

      <Footer></Footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  return AuthGuard(context);
}