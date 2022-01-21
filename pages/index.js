import Head from 'next/head'
import Navbar from '../components/navbar'
import PresentationCard from '../components/presentation-card'
import About from '../components/about'
import Footer from '../components/footer'

export default function Home() {
	return (
		<div>
			<Head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				<title>tatsuya</title>
				<link rel="shortcut icon" href="/images/favicon.ico" />
			</Head>
			<main>
				<Navbar></Navbar>
				<PresentationCard></PresentationCard>
				<About></About>
				<Footer></Footer>
			</main>
		</div>
	)
}
