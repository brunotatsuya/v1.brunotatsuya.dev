import Link from 'next/link'
import { motion } from 'framer-motion'

import { BsPencilSquare } from 'react-icons/bs'
import { MdDateRange } from 'react-icons/md'

export default function PostCards({ posts }) {

  return posts?.length > 0 ? (
    <ul className="cards pb-5">
      {posts.map((post, index) => {
        var datePublished = new Date(post.datePublished);
        return (
          <li className="cards-item" data-aos="zoom-in" data-aos-duration="500" data-aos-delay={100 * index} key={index}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link legacyBehavior href={"/blog/" + post.slug} passHref>
                <a className="text-black">
                  <div className="card">
                    <img className="card-img-top" src={post.coverImgurl} />
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-subtitle">{post.description}</p>
                    </div>
                    <div className="card-footer bg-light">
                      <div className="text-muted">
                        <small><BsPencilSquare /> {post.author} </small>
                        <small className="mx-2"><MdDateRange /> {datePublished.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </motion.div>
          </li>
        )
      })}
    </ul>
  ) : (<div className="display-6 fs-4 text-center text-muted">No posts yet</div>)
}