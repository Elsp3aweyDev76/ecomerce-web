// import { cn } from "@/lib/utils";

// const Title = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <h2 className={cn("text-2xl font-semibold", className)}>{children}</h2>
//   );
// };
// export {Title};

//***********************
// from ai
//***********************

import React from "react";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: HeadingTag;
  variant?: "default" | "section" | "card" | "hero";
  className?: string;
}

const variantStyles: Record<NonNullable<TitleProps["variant"]>, string> = {
  default: "text-2xl font-bold tracking-tight text-shop_dark_green",
  section: "text-2xl md:text-3xl font-bold tracking-tight text-shop-dark-green",
  card: "text-base md:text-lg font-semibold line-clamp-1 text-gray-800",
  hero: "text-3xl md:text-5xl font-extrabold leading-tight text-shop-dark-green",
};

const Title = ({
  children,
  as: Component = "h2",
  variant = "default",
  className,
  ...props
}: TitleProps) => {
  return (
    <Component className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Component>
  );
};

export default Title;
