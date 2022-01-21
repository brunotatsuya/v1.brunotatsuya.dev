import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-vh-100 bg-light" id="about">

      <div className="container w-75 align-items-center">
        <span className="display-5 d-flex justify-content-center title-section" data-aos="fade-left" data-aos-duration="500">about</span>
        <div className="d-flex justify-content-center" data-aos="fade-left" data-aos-delay="200" data-aos-duration="500">
          <div className="divider-title-section"></div>
        </div>
        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-center align-items-center padding-top-2x padding-bottom-1x">
          <div className="w-75 text-white font-monospace" data-aos="fade-right" data-aos-duration="800">
            <motion.div className="text-center mb-4" whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.8,
                borderRadius: "100%"
              }}>
              <img width="230" src="/images/prof.png"></img>
            </motion.div>
          </div>

          <div className="container font-monospace" data-aos="fade-left" data-aos-duration="800">
            Hi, my name is <b className="text-secondary">Bruno</b>! I am a computer scientist and software developer with 2+ years of experience, living in São Paulo, Brazil. Currently working as a Python Full-Stack Developer at <a target="_blank" href="https://www.itau.com.br/">Itaú Unibanco</a>, I am also an entusiast in Machine Learning and Natural Language Processing techniques.
            <br /><br />Here are a few technologies I have been working with recently:<br /><br />
            <div className="d-flex justify-content-left font-monospace">
              <div className="d-flex flex-wrap flex-sm-nowrap mb-4">

                <div className="mx-2" data-aos="fade-left" data-aos-duration="400" data-aos-delay="200">
                  <motion.div whileHover={{ scale: 1.2 }}><img width="48" title="Python" src="/images/python.svg"></img></motion.div>
                </div>
                <div className="mx-2" data-aos="fade-left" data-aos-duration="400" data-aos-delay="400">
                  <motion.div whileHover={{ scale: 1.2 }}><img width="48" title="JavaScript" src="/images/js.svg"></img></motion.div>
                </div>
                <div className="mx-2" data-aos="fade-left" data-aos-duration="400" data-aos-delay="600">
                  <motion.div whileHover={{ scale: 1.2 }}><img width="48" title=".NET Core" src="/images/dotnet_core.svg"></img></motion.div>
                </div>
                <div className="mx-2" data-aos="fade-left" data-aos-duration="400" data-aos-delay="800">
                  <motion.div whileHover={{ scale: 1.2 }}><img height="48" title="Flask" src="/images/flask.svg"></img></motion.div>
                </div>
                <div className="mx-2" data-aos="fade-left" data-aos-duration="400" data-aos-delay="1000">
                  <motion.div whileHover={{ scale: 1.2 }}><img height="48" title="Next.js" src="/images/nextjs.svg"></img></motion.div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}