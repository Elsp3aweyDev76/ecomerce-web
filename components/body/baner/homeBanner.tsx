"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SmartButton from "@/components/ui/smart-button";
import Title from "@/components/ui/text";
import shoppingHdImg from "@/lib/assets/images/7-2-shopping-png-hd.png";
import shoppingPicImg from "@/lib/assets/images/10-2-shopping-picture.png";
import promoBannerImg from "@/lib/assets/images/imgbin_64693f7526412a6eba40afaf26393e24.png";

interface SlideItem {
  id: number;
  image: StaticImageData;
  alt: string;
  title: string;
  subtitle?: string;
  badge?: string;
  href: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 1,
    image: shoppingHdImg,
    alt: "Shopping HD Product",
    title: "Grab Up To 50% off on Selected headphones",
    subtitle: "Free shipping on orders over $50",
    badge: "Limited Offer",
    href: "/shop?category=headphones",
  },
  {
    id: 2,
    image: shoppingPicImg,
    alt: "Shopping Collection",
    title: "New Arrivals & Best Deals on Top Products",
    subtitle: "Fresh drops every week",
    badge: "New Arrivals",
    href: "/shop",
  },
  {
    id: 3,
    image: promoBannerImg,
    alt: "Special Shopping Offer",
    title: "Exclusive Online Discounts Up To 30% Off",
    subtitle: "Use code SAVE30 at checkout",
    badge: "Exclusive",
    href: "/shop?sort=featured",
  },
];

const AUTOPLAY_MS = 5000;

function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [progressKey, setProgressKey] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number, dir?: 1 | -1) => {
    setDirection(dir ?? (index > currentIndex ? 1 : -1));
    setCurrentIndex(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
    setProgressKey((k) => k + 1);
  }, [currentIndex]);

  const handlePrev = useCallback(() => goTo(currentIndex - 1, -1), [goTo, currentIndex]);
  const handleNext = useCallback(() => goTo(currentIndex + 1, 1), [goTo, currentIndex]);

  useEffect(() => {
    if (isPaused || isDragging) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => handleNext(), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, isDragging, handleNext]);

  useEffect(() => {
    const onVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current > 0) handlePrev();
      else handleNext();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Featured offers"
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-shop_light_pink overflow-hidden outline-none select-none"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16 py-10 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pr-6 md:pr-10">
          <div key={`text-${currentSlide.id}`} className="max-w-xl z-10 text-center md:text-start animate-[fadeSlideIn_0.5s_ease_both]">
            {currentSlide.badge && (
              <span className="inline-block mb-3 px-3 py-1 text-xs font-bold rounded-full bg-white text-shop_dark_green shadow-sm">
                {currentSlide.badge}
              </span>
            )}
            <Title className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
              {currentSlide.title}
            </Title>
            {currentSlide.subtitle && (
              <p className="mt-2 text-sm md:text-base text-gray-600">{currentSlide.subtitle}</p>
            )}
            <SmartButton href={currentSlide.href} size="md" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right" className="mt-5">
              Buy Now
            </SmartButton>
          </div>

          <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] h-72 sm:h-80 lg:h-96 flex items-end justify-center shrink-0 overflow-hidden">
            <Image
              key={currentSlide.id}
              src={currentSlide.image}
              alt={currentSlide.alt}
              className={`w-full h-full object-contain object-bottom transition-all duration-500 ease-out ${direction === 1 ? "animate-[slideFromRight_0.5s_ease_both]" : "animate-[slideFromLeft_0.5s_ease_both]"}`}
              priority={currentIndex === 0}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-shop_light_pink via-shop_light_pink/70 to-transparent" />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-2">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive}
                  className={`h-2.5 rounded-full transition-all duration-300 ${isActive ? "w-8 bg-shop_dark_green" : "w-2.5 bg-shop_dark_green/30 hover:bg-shop_dark_green/60"}`}
                />
              );
            })}
          </div>
          {!isPaused && !isDragging && (
            <div className="w-32 h-1 bg-black/10 rounded-full overflow-hidden">
              <div
                key={progressKey}
                className="h-full bg-shop_dark_green origin-left animate-[progressBar_5s_linear_forwards]"
              />
            </div>
          )}
        </div>
      </div>

      <button type="button" onClick={handlePrev} aria-label="Previous slide" className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-sm transition z-20">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button type="button" onClick={handleNext} aria-label="Next slide" className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-sm transition z-20">
        <ChevronRight className="h-5 w-5" />
      </button>

      <style jsx>{`
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideFromRight { from { opacity: 0; transform: translateX(40px) scale(0.98); } to { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes slideFromLeft { from { opacity: 0; transform: translateX(-40px) scale(0.98); } to { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes progressBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>
    </section>
  );
}

export default HomeBanner;