import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Blog(props) {

  const posts = props.posts;

  return (
    <div className="bg-light2" id="blog">

      <div className="container w-75 align-items-center">
        <span className="display-5 d-flex justify-content-center title-section" data-aos="fade-right" data-aos-duration="500">blog</span>
        <div className="d-flex justify-content-center" data-aos="fade-right" data-aos-delay="200" data-aos-duration="500">
          <div className="divider-title-section bottom-gap-3"></div>
        </div>

        <div className="container font-monospace fs-6 text-center bottom-gap-3" data-aos="zoom-in" data-aos-duration="500">
          <Link href="/blog" passHref>
            <a className="left">view the archive</a>
          </Link>
        </div>

        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-center align-items-center padding-top-2x padding-bottom-1x bottom-gap-4">
          {posts.map((obj, index) => {
            return (
              <div className="font-monospace mx-2" data-aos="zoom-in" data-aos-duration="500" data-aos-delay={100*index}>
                <motion.div className="text-center bottom-gap" whileHover={{ scale: 1.1 }}
                  whileTap={{
                    scale: 0.8,
                    borderRadius: "100%"
                  }}>
                  <div className="card">
                    <img className="card-img-top" src={obj.imgurl} alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">{obj.title}</h5>
                      <p className="card-text">{obj.description}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}