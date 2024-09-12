import Link from 'next/link'
import { destroyCookie } from 'nookies'
import { BsDiamondFill } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { useRouter } from 'next/router'

export default function Navbar() {

  const router = useRouter();

  const handleClick = () => {
    destroyCookie(null, 'tatsuya-token', {
      path: '/'
    });
    router.push({
      pathname: '/admin/login'
    });
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-secondary" id="mainNav">
      <div className="container" id="containerNavbar">
        <Link  legacyBehavior href="/admin" passHref>
          <a className="navbar-brand" >
            <BsDiamondFill className="spinner-element" /><span className="mx-3 fs-5">brunotatsuya.dev/admin</span>
          </a>
        </Link>
        <button className="navbar-toggler font-weight-bold text-white btn-primary btn-round" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <FaBars />
        </button>
        <div className="collapse navbar-collapse font-monospace" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-0 mx-lg-1">
              <Link legacyBehavior href="/" passHref>
                <a className="nav-link py-3 px-0 px-lg-3">go to homepage</a>
              </Link>
            </li>
            <li className="nav-item mx-0 mx-lg-1">
              <a className="nav-link py-3 px-0 px-lg-3" onClick={handleClick}>logout</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  )
}
