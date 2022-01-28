import Head from 'next/head'
import Navbar from '../../components/admin/navbar'
import Footer from '../../components/footer'

import { AuthGuard } from '../../services/auth'

export default function Login(props) {
  
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>tatsuya.admin</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <div className="display-6 text-center min-vh-100">Logged as {props.userAuthenticated}</div>
      <Footer></Footer>
    </>
  )
}

export async function getServerSideProps(context) {
  return AuthGuard(context);
}