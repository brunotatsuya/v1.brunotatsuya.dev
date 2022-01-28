import Link from 'next/link'
import { destroyCookie } from 'nookies'
import { BsDiamondFill } from 'react-icons/bs'
import { ImExit } from 'react-icons/im'
import { useRouter } from 'next/router'

export default function Navbar() {

  const router = useRouter();

  const handleClick = (e) => {
    destroyCookie({}, 'tatsuya-token');
    router.push({
      pathname: '/admin/login'
    });
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-secondary" id="mainNav">
      <div className="container">
        <Link href="/admin" passHref>
          <a className="navbar-brand" >
            <BsDiamondFill className="spinner-element" /><span className="mx-3">tatsuya.admin</span>
          </a>
        </Link>
        <div className="ms-auto">
          <button className="btn btn-primary btn-round text-white" onClick={handleClick}>
            <ImExit />
          </button>
        </div>
      </div>
    </nav>
  )
}
