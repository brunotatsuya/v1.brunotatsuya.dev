import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { SiGmail } from 'react-icons/si'

export default function Navbar() {
  return (
    <div className="bg-dark text-center pb-1" id="footer">
      <div className="d-inline-flex mt-2">
        <a href="https://github.com/brunotatsuya" target="_blank" rel="noreferrer">
          <h4 className="socialMediaButton mx-3 font-weight-bold text-white"><BsGithub /></h4>
        </a>
        <a href="https://www.linkedin.com/in/bruno-tatsuya/" target="_blank" rel="noreferrer">
          <h4 className="socialMediaButton mx-2 font-weight-bold text-white"><BsLinkedin /></h4>
        </a>
        <a href="mailto:brunomasunaga@gmail.com" target="_blank" rel="noreferrer">
          <h4 className="socialMediaButton mx-3 font-weight-bold text-white"><SiGmail /></h4>
        </a>
      </div>
      <div className="text-white-50 font-monospace mb-2">
        Designed and built by <span className="text-primary">Bruno Tatsuya </span> © 2024
      </div>
    </div>
  )
}
