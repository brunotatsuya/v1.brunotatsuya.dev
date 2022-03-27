import { motion } from 'framer-motion'

export default function About() {

  const techs = [
    { name: "Python", icon: "/images/python.svg" },
    { name: "JavaScript", icon: "/images/js.svg" },
    { name: "TypeScript", icon: "/images/ts.svg" },
    { name: "Flask", icon: "/images/flask.svg" },
    { name: "React", icon: "/images/react.svg" },
    { name: "Next.js", icon: "/images/nextjs.svg" },
    { name: ".NET Core", icon: "/images/dotnet_core.svg" },
    { name: "MongoDB", icon: "/images/mongodb.svg" },
    { name: "Microsoft SQL Server", icon: "/images/mssql.svg" }
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
            Hi, my name is <b className="text-secondary">Bruno</b>! I am a computer scientist and software developer with 2+ years of experience, living in São Paulo, Brazil. Currently working as a Python Full-Stack Developer at <a className="left" target="_blank" href="https://www.itau.com.br/" rel="noreferrer">Itaú Unibanco</a>, I am also an entusiast in Machine Learning and Natural Language Processing techniques.
            <br /><br />Here are a few technologies I have been working with recently:<br /><br />
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