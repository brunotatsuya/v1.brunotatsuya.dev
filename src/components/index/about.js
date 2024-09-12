import { motion } from 'framer-motion'

export default function About() {

  const techs = [
    { name: "Python", icon: "/images/python.svg" },
    { name: "Flask", icon: "/images/flask.png" },
    { name: "FastAPI", icon: "/images/fast-api.svg" },
    { name: "React", icon: "/images/react.svg" },
    { name: "Node.js", icon: "/images/nodejs.png" },
    { name: "Next.js", icon: "/images/nextjs.svg" },
    { name: "Ruby on Rails", icon: "/images/ruby-on-rails.png" },
    { name: "MongoDB", icon: "/images/mongodb.svg" },
    { name: "PostgreSQL", icon: "/images/postgres.png" }
  ]

  return (
    <div className="bg-light" id="about">
      <div className="container align-items-center bottom-gap-4">
        <span className="display-5 d-flex justify-content-center title-section" data-aos="fade-left" data-aos-duration="500">about</span>
        <div className="d-flex justify-content-center" data-aos="fade-left" data-aos-delay="200" data-aos-duration="500">
          <div className="divider-title-section bottom-gap-4"></div>
        </div>
        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-center align-items-center padding-top-2x padding-bottom-1x">
          <div className="text-white font-monospace" data-aos="zoom-in" data-aos-duration="800">
            <motion.div className="text-center min-vw-35 bottom-gap-2" whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.8,
                borderRadius: "100%"
              }}>
              <img width="230" src="/images/prof.png"></img>
            </motion.div>
          </div>

          <div className="container font-monospace fs-6" data-aos="fade-left" data-aos-duration="800">
            Hi, I&apos;m <b className="text-secondary">Bruno</b>! I&apos;m a software developer and computer scientist with 5 years of experience, based in Portugal. Also an enthusiastic in data science and automation. Currently working as a Senior Software Developer at <a className="left" target="_blank" href="https://web.imaginarycloud.com/" rel="noreferrer">Imaginary Cloud</a>, I believe technology should be used to make people&apos;s lives easier.
            <br /><br />Here are a few technologies I have experience with:<br /><br />
            <div className="d-flex justify-content-left font-monospace">
              <div className="d-flex flex-wrap flex-sm-nowrap">
                {techs.map((tech, index) => {
                  return (
                    <div className="mx-2 mb-4" data-aos="fade-left" data-aos-duration="400" data-aos-delay={100 * index} key={index}>
                      <motion.div whileHover={{ scale: 1.2 }}><img height="48" title={tech.name} src={tech.icon}></img></motion.div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}