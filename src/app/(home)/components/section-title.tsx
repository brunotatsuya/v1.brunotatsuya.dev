import AnimatedScroll from "@/components/animated-scroll";

type SectionTitleProps = {
  title: string;
  animationDirection: "up" | "down" | "left" | "right";
  textClassName?: string;
  dividerClassName?: string;
  delayBeforeDivider?: number;
};

export default function SectionTitle(props: SectionTitleProps) {
  const {
    title,
    animationDirection,
    textClassName,
    dividerClassName,
    delayBeforeDivider,
  } = props;

  return (
    <>
      <AnimatedScroll
        type={`fade-${animationDirection}`}
        duration={500}
        className={`display-5 d-flex justify-content-center title-section`}
      >
        <p className={`${textClassName}`}>{title}</p>
      </AnimatedScroll>

      <AnimatedScroll
        type={`fade-${animationDirection}`}
        delay={delayBeforeDivider ?? 200}
        duration={500}
        className={`d-flex justify-content-center`}
      >
        <div
          className={`divider-title-section bottom-gap-4 ${dividerClassName}`}
        ></div>
      </AnimatedScroll>
    </>
  );
}
