import { BlogPost } from "@/server/models/blog-posts";
import AnimatedScroll from "@/components/ui/animated-scroll";

import PostCard from "./post-card";

type PostCardsListProps = {
  posts: BlogPost[];
};

export default function PostCardsList({ posts }: PostCardsListProps) {
  return posts?.length > 0 ? (
    <ul className="cards pb-5">
      {posts.map((post, index) => {
        return (
          <AnimatedScroll
            className="cards-item"
            type="zoom-in"
            duration={500}
            delay={100 * index}
            key={index}
            as="li"
          >
            <PostCard post={post} />
          </AnimatedScroll>
        );
      })}
    </ul>
  ) : (
    <div className="display-6 fs-4 text-center text-muted">No posts yet</div>
  );
}
