import { SiGmail } from 'react-icons/si'

export default function Contact() {

  return (
    <div className="bg-dark2" id="contact">
      <div className="container w-75 align-items-center text-white">
        <span className="display-5 d-flex justify-content-center title-section" data-aos="fade-down" data-aos-duration="500">get in touch</span>
        <div className="d-flex justify-content-center" data-aos="fade-down" data-aos-duration="500">
          <div className="divider-title-section bottom-gap-3 bg-white"></div>
        </div>
        <div className="container font-monospace fs-6 text-center bottom-gap-3 text-white" data-aos="fade-down" data-aos-duration="500">
          have a question or want to work together?
        </div>
        <div className="container font-monospace fs-6 text-center" data-aos="fade-down" data-aos-duration="500">
          <a className="text-white" href="mailto:brunomasunaga@gmail.com" target="_blank" rel="noreferrer">
            <button className="btn btn-primary font-monospace fs-6 bottom-gap-4">
              <SiGmail /> mail me!
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}