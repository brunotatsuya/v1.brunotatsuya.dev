import Head from 'next/head'
import { useState } from 'react'
import Footer from '../../components/footer'
import Navbar from '../../components/admin/navbar'
import PostsTable from '../../components/admin/posts-table'
import AuthGuard from '../../components/auth-guard'
import { getLastBlogPosts } from '../api/posts'

export default function Login(props) {

  const [postsList, setPostsList] = useState(props.posts);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClick = () => {
    setIsLoading(true);
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        title: "New post",
        isPublished: false
      }),
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          setPostsList(postsList.concat(response.data));
        }
        setIsLoading(false);
      });
  }

  return (
    <AuthGuard showLoading={true}>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Admin | Bruno Tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <div className="min-vh-100 bg-light2">
        <div className="container mt-5 pt-5">
          <div className="container bg-white pt-4 pb-2 round-border">
            <div className="d-flex mx-3 mb-3">
              <h4>Manage blog posts</h4>
              {isLoading ?
                  <button className="btn btn-primary btn-sm ms-auto" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </button> :
                  <button className="btn btn-primary btn-sm ms-auto" onClick={handleAddClick}>Create post</button>
                }
            </div>
            <hr />
            <PostsTable postsList={postsList} setPostsList={setPostsList}></PostsTable>
            <hr />
          </div>
        </div>

      </div>
      <Footer></Footer>
    </AuthGuard>
  )
}


export async function getStaticProps() {
  const posts = await getLastBlogPosts({onlyPublished: false});
  return { props: { posts }, revalidate: 5 }
}