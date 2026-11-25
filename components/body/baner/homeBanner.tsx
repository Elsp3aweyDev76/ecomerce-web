"use client";

import React, { useEffect, useState } from "react";
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
  href: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 1,
    image: shoppingHdImg,
    alt: "Shopping HD Product",
    title: "Grab Up To 50% off on Selected headphones",
    href: "/shop?category=headphones",
  },
  {
    id: 2,
    image: shoppingPicImg,
    alt: "Shopping Collection",
    title: "New Arrivals & Best Deals on Top Products",
    href: "/shop",
  },
  {
    id: 3,
    image: promoBannerImg,
    alt: "Special Shopping Offer",
    title: "Exclusive Online Discounts Up To 30% Off",
    href: "/shop?sort=featured",
  },
];

function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = SLIDES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative py-10 md:py-8 bg-shop_light_pink rounded-lg px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pr-6 md:pr-10">
        {/* النص وزر الشراء */}
        <div className="max-w-xl z-10 text-center md:text-start">
          <Title className="text-2xl sm:text-3xl md:text-xxl font-semibold leading-snug">
            {currentSlide.title}
          </Title>

          <SmartButton
            href={currentSlide.href}
            size="md"
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
            className="mt-5"
          >
            Buy Now
          </SmartButton>
        </div>

        {/* منطقة عرض الصورة الحالية */}
        <div className="relative w-full max-w-85 sm:max-w-100 lg:max-w-115 h-72 sm:h-80 lg:h-96 flex items-end justify-center shrink-0 overflow-hidden">
          <Image
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.alt}
            className="w-full h-full object-contain object-bottom transition-all duration-300"
            priority={currentIndex === 0}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-shop_light_pink via-shop_light_pink/70 to-transparent" />
        </div>
      </div>

      {/* أزرار التنقل (يمين / يسار) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-sm transition z-20"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-sm transition z-20"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* نقاط المؤشر السفلية */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-200 ${
                isActive
                  ? "w-7 bg-shop_dark_green"
                  : "w-2.5 bg-shop_dark_green/30 hover:bg-shop_dark_green/60"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomeBanner;
