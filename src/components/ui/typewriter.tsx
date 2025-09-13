"use client";

import TypewriterEffect from "typewriter-effect";

type TypewriterProps = React.ComponentProps<typeof TypewriterEffect>;

export default function Typewriter(props: TypewriterProps) {
  return <TypewriterEffect {...props} />;
}
