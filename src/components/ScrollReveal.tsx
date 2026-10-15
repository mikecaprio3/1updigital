import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "fade";
  duration?: number;
  threshold?: number;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 750,
  threshold = 0.12,
  as: Component = "div",
  style = {},
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    delay,
    threshold,
    rootMargin: "0px 0px -50px 0px",
    once: true,
  });

  // Base directional transform classes before entering view
  const initialTransforms: Record<string, string> = {
    up: "translate-y-6 sm:translate-y-7",
    left: "-translate-x-6 sm:-translate-x-7",
    right: "translate-x-6 sm:translate-x-7",
    scale: "scale-[0.985] translate-y-4",
    fade: "translate-y-0",
  };

  const initialClass = initialTransforms[direction] || initialTransforms.up;

  const transitionStyle: React.CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    ...style,
  };

  return (
    <Component
      ref={ref}
      style={transitionStyle}
      className={`transition-[opacity,transform] will-change-[opacity,transform] ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0 scale-100"
          : `opacity-0 ${initialClass}`
      } ${className}`}
    >
      {children}
    </Component>
  );
};
