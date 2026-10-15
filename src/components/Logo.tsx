import React from "react";

interface LogoProps {
  className?: string;
  size?: "header" | "footer" | "md" | "lg" | "sm";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "header",
}) => {
  const isFooter = size === "footer" || size === "lg";

  return (
    <div
      className={`inline-flex items-center select-none group transition-opacity duration-200 hover:opacity-90 ${className}`}
      aria-label="1Up Digital"
    >
      <img
        src="/1up-digital-wordmark-v2.png"
        alt="1Up Digital"
        className={`w-auto object-contain transition-all ${
          isFooter
            ? "h-8 sm:h-9"
            : "h-[31px] sm:h-8 md:h-[34px] max-w-[155px] sm:max-w-[180px]"
        }`}
        loading="eager"
      />
    </div>
  );
};
