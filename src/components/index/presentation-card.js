import Typewriter from 'typewriter-effect'
import { FiArrowDown } from 'react-icons/fi'

export default function PresentationCard() {
  
  return (
    <div className="h-100" id="presentationCard">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="row d-flex">
        <div className="container" id="presentationGreetings">
          <div>
            <h1 className="display-6 font-weight-bold text-white" data-aos="fade-right">{"hi, i'm"}</h1>
            <h1 className="display-2 font-weight-bold text-white" data-aos="fade-right" data-aos-delay="900">{"bruno tatsuya"}</h1>
            <div className="d-flex">
              <h4 className="font-weight-bold text-white mx-1 font-monospace" data-aos="flip-up" data-aos-delay="1800">
                <Typewriter
                  options={{
                    strings: ['Software Engineer.', 'Computer Scientist.'],
                    autoStart: true,
                    loop: true
                  }}
                />
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="h-25 d-flex justify-content-center d-flex align-items-center" data-aos="fade-up" data-aos-delay="3000">
        <a href="#about">
          <button className="btn font-monospace fs-5 text-white" id="discoverMe">
            Discover me <FiArrowDown />
          </button>
        </a>
      </div>
    </div>
  )
}