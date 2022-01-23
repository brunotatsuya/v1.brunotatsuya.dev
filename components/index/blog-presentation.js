import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BlogPresentation(props) {

  const posts = props.posts;

  return (
    <div className="bg-light2" id="blog">

      <div className="container align-items-center bottom-gap-3">
        <span className="display-5 d-flex justify-content-center title-section" data-aos="fade-right" data-aos-duration="500">blog</span>
        <div className="d-flex justify-content-center" data-aos="fade-right" data-aos-delay="200" data-aos-duration="500">
          <div className="divider-title-section bottom-gap-3"></div>
        </div>

        <div className="container font-monospace fs-6 text-center bottom-gap-3" data-aos="zoom-in" data-aos-duration="500">
          <Link href="/blog" passHref>
            <a className="left">view the archive</a>
          </Link>
        </div>


        <ul className="cards">
          {posts.map((post, index) => {
            return (
              <li className="cards-item" data-aos="zoom-in" data-aos-duration="500" data-aos-delay={100*index} key={index}>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <div className="card">
                    <img className="card-img-top" src={post.imgurl} />
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-subtitle">{post.description}</p>
                    </div>
                    <div className="card-footer"><small className="text-muted">by Bruno Tatsuya - 22/01/2022</small></div>
                  </div>
                </motion.div>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  )
}
