import Image from "next/image";

import MotionDiv from "@/components/motion-div";
import AnimatedScroll from "@/components/animated-scroll";

import SectionTitle from "./section-title";

const techs = [
  { name: "Python", icon: "/images/python.svg" },
  { name: "Flask", icon: "/images/flask.png" },
  { name: "FastAPI", icon: "/images/fast-api.svg" },
  { name: "React", icon: "/images/react.svg" },
  { name: "Node.js", icon: "/images/nodejs.png" },
  { name: "Next.js", icon: "/images/nextjs.svg" },
  { name: "Ruby on Rails", icon: "/images/ruby-on-rails.png" },
  { name: "MongoDB", icon: "/images/mongodb.svg" },
  { name: "PostgreSQL", icon: "/images/postgres.png" },
];

export default function About() {
  return (
    <div className="bg-light" id="about">
      <div className="container align-items-center bottom-gap-4">
        <SectionTitle title="about" animationDirection="left" />

        <div className="d-flex flex-wrap flex-sm-nowrap justify-content-center align-items-center padding-top-2x padding-bottom-1x">
          <AnimatedScroll
            type="zoom-in"
            duration={800}
            className="text-white font-monospace text-center min-vw-35 bottom-gap-2"
          >
            <MotionDiv
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8, borderRadius: "100%" }}
            >
              <Image
                width={230}
                height={230}
                src="/images/prof.png"
                alt="Bruno Tatsuya's profile photo"
              />
            </MotionDiv>
          </AnimatedScroll>

          <AnimatedScroll
            type="fade-left"
            duration={800}
            className="container font-monospace fs-6"
          >
            Hi, I&apos;m <b className="text-secondary">Bruno</b>! I&apos;m a
            software developer and computer scientist with 5 years of
            experience, based in Portugal. Also an enthusiast in data science
            and automation. Currently working as a Senior Software Developer at{" "}
            <a
              className="left"
              target="_blank"
              href="https://web.imaginarycloud.com/"
              rel="noreferrer"
            >
              Imaginary Cloud
            </a>
            , I believe technology should be used to make people&apos;s lives
            easier.
            <br />
            <br />
            Here are a few technologies I have experience with:
            <br />
            <br />
            <div className="d-flex justify-content-left font-monospace">
              <div className="d-flex flex-wrap flex-sm-nowrap">
                {techs.map((tech, index) => (
                  <AnimatedScroll
                    key={index}
                    type="fade-left"
                    duration={400}
                    delay={100 * index}
                    className="mx-2 mb-4"
                  >
                    <MotionDiv whileHover={{ scale: 1.2 }}>
                      <Image
                        width={48}
                        height={48}
                        title={tech.name}
                        src={tech.icon}
                        alt={`${tech.name} logo`}
                      />
                    </MotionDiv>
                  </AnimatedScroll>
                ))}
              </div>
            </div>
          </AnimatedScroll>
        </div>
      </div>
    </div>
  );
}
