import Head from 'next/head'
import Script from 'next/script'

export default function Home() {
  return (
    <div>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <Script src="/public/hello.js" crossorigin="anonymous" />
      </Head>
      <h1>Hello world</h1>
    </div>
  )
}
