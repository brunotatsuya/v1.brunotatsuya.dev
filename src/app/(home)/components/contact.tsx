import { SiGmail } from "react-icons/si";

import AnimatedScroll from "@/components/animated-scroll";

import SectionTitle from "./section-title";

export default function Contact() {
  return (
    <div className="bg-dark2" id="contact">
      <div className="container w-75 align-items-center text-white">
        <SectionTitle
          title="get in touch"
          animationDirection="down"
          dividerClassName="bg-white"
          delayBeforeDivider={1}
        />

        <AnimatedScroll
          type="fade-down"
          duration={500}
          className="container font-monospace fs-6 text-center bottom-gap-3 text-white"
        >
          have a question or want to work together?
        </AnimatedScroll>

        <AnimatedScroll
          type="fade-down"
          duration={500}
          className="container font-monospace fs-6 text-center"
        >
          <a
            className="text-white"
            href="mailto:brunomasunaga@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <button className="btn btn-primary font-monospace fs-6 bottom-gap-4">
              <SiGmail /> mail me!
            </button>
          </a>
        </AnimatedScroll>
      </div>
    </div>
  );
}
