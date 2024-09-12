import Head from 'next/head'

export default function Loading() {
  return (
    <>
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="google-site-verification" content="sL23D9PQlVxT_dObPJKM21_-P8hx7c-nCvIwf83Y3gw" />
      <title>Bruno Tatsuya</title>
      <link rel="shortcut icon" href="/images/favicon.ico" />
    </Head>
    <div className="hollowBodyLoader">
      <div className="hollowLoader">
        <div className="largeBox">
          <div className="smallBox"></div>
        </div>
      </div>
    </div>
    </>
  )
}
