import Head from 'next/head'
import { useRouter } from 'next/router'

import Navbar from '../../components/admin/navbar'
import PostsTable from '../../components/admin/posts-table'
import { AuthGuard } from '../../services/auth'
import { getLastBlogPosts } from '../api/get-last-blog-posts'

export default function Login(props) {

  const router = useRouter();

  const handleAddClick = () => {
    router.push({
      pathname: '/admin/create-post'
    });
  }

  return (
    <div className="min-vh-100">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>tatsuya.admin</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <div className="container mt-5 pt-5">
        <div className="d-flex mx-3 mb-3">
          <h4>Manage blog posts</h4>
          <button className="btn btn-primary btn-sm ms-auto" onClick={handleAddClick}>Create post</button>
        </div>
        <hr />
        <PostsTable posts={props.posts}></PostsTable>
        <hr />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  var audit = AuthGuard(context);
  if ('props' in audit) {
    const posts = await getLastBlogPosts();
    audit.props.posts = posts;
  }
  return audit
}