type AnimatedScrollProps = {
  children: React.ReactNode;
  type:
    | "fade-up"
    | "fade-down"
    | "fade-right"
    | "fade-left"
    | "zoom-in"
    | "flip-up";
  duration?: number;
  delay?: number;
  className?: string;
};

export default function AnimatedScroll(props: AnimatedScrollProps) {
  const { className, children, type, duration, delay } = props;

  return (
    <div
      {...(className && { className })}
      data-aos={type}
      {...(duration && { "data-aos-duration": duration })}
      {...(delay && { "data-aos-delay": delay })}
    >
      {children}
    </div>
  );
}
