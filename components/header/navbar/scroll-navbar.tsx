"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollNavbarProps {
  children: React.ReactNode;
  /** المسافة بالبكسل لاعتبار الصفحة في وضع السكرول */
  threshold?: number;
  /** تنسيقات إضافية تُطبّق فقط عند عمل سكرول لأسفل */
  scrolledClassName?: string;
  className?: string;
}

export default function ScrollNavbar({
  children,
  threshold = 80,
  scrolledClassName = "bg-white/95 backdrop-blur-md  border-b border-gray-200",
  className = "",
}: ScrollNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [height, setHeight] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (innerRef.current) {
        setHeight(innerRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [children]);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      setIsScrolled(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <>
      {/* يحجز ارتفاع الهيدر حتى لا يغطي المحتوى بداية الصفحة */}
      <div style={{ height }} aria-hidden="true" />

      <header
        data-scrolled={isScrolled ? "true" : "false"}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${
          isScrolled ? scrolledClassName : "bg-white"
        } ${className}`}
      >
        <div ref={innerRef}>{children}</div>
      </header>
    </>
  );
}
