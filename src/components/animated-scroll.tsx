type AnimatedScrollProps<T extends React.ElementType = "div"> = {
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
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

export default function AnimatedScroll<T extends React.ElementType = "div">({
  children,
  type,
  duration,
  delay,
  className,
  as,
  ...rest
}: AnimatedScrollProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={className}
      data-aos={type}
      {...(duration && { "data-aos-duration": duration })}
      {...(delay && { "data-aos-delay": delay })}
      {...rest} // pass any other valid props
    >
      {children}
    </Component>
  );
}
