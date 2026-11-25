"use client";
import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartButtonProps {
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

const variantClasses: Record<
  NonNullable<SmartButtonProps["variant"]>,
  string
> = {
  primary:
    "bg-shop_dark_green/90 text-white/90 hover:bg-shop_dark_green hover:text-white",
  outline:
    "border border-shop_dark_green text-shop_dark_green hover:bg-shop_dark_green hover:text-white",
  ghost: "text-shop_dark_green hover:bg-shop_dark_green/10",
};

const sizeClasses: Record<NonNullable<SmartButtonProps["size"]>, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-5 py-2 text-sm",
  lg: "px-7 py-3 text-base",
};

function SmartButton({
  href,
  type = "button",
  onClick,
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  isLoading = false,
  disabled = false,
  className,
}: SmartButtonProps) {
  const isInactive = disabled || isLoading;

  const baseClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 select-none",
    variantClasses[variant],
    sizeClasses[size],
    isInactive && "opacity-60 pointer-events-none cursor-not-allowed",
    className,
  );

  const content = (
    <>
      {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
      {!isLoading && icon && iconPosition === "left" && (
        <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-disabled={isInactive}
        tabIndex={isInactive ? -1 : undefined}
        onClick={(e) => {
          if (isInactive) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        className={baseClassName}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={isInactive}
      onClick={onClick}
      className={baseClassName}
    >
      {content}
    </button>
  );
}

export default SmartButton;
