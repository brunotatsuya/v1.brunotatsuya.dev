import Router from 'next/router'
import Aos from 'aos'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'aos/dist/aos.css'
import 'nprogress/nprogress.css'

import '../../public/Lato.css'
import '../../public/Montserrat.css'
import '../styles/globals.css'
import '../styles/github-syntax-highlight.css'
import '../styles/github-markdown.css'

nProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function App({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
    Aos.init({ duration: 1200 });
  }, []);

  return (<Component {...pageProps} />);
}

export default App