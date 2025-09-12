"use client";

import { motion, MotionProps } from "framer-motion";
import React from "react";

interface MotionDivProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

const MotionDiv: React.FC<MotionDivProps> = ({ children, ...motionProps }) => {
  return <motion.div {...motionProps}>{children}</motion.div>;
};

export default MotionDiv;
