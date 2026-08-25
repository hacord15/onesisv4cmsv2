"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

type Platform = {
  name: string;
  description: string;
  image: StaticImageData | string;
};

interface TechnologyPlatformSliderProps {
  platforms: Platform[];
}

const AUTO_SLIDE_INTERVAL = 4000;

export function TechnologyPlatformSlider({
  platforms,
}: TechnologyPlatformSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % platforms.length);
    }, AUTO_SLIDE_INTERVAL);
  }, [platforms.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    startTimer(); // click ke baad bhi auto-slide normally continue kare
  };

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
      {/* Left — image slider */}
      <div className="relative h-[320px] w-full overflow-hidden rounded-2xl sm:h-[420px] lg:h-full">
        {platforms.map((platform, index) => (
          <div
            key={platform.name}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={platform.image}
              alt={platform.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        {/* Slider indicators */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {platforms.map((platform, index) => (
            <button
              key={platform.name}
              type="button"
              aria-label={`Show ${platform.name}`}
              onClick={() => handleSelect(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right — platform cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {platforms.map((platform, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={platform.name}
              type="button"
              onClick={() => handleSelect(index)}
              className={`group flex flex-col rounded-xl border p-6 text-left transition-all duration-300 ${
                isActive
                  ? "border-[var(--color-brand)] bg-white shadow-md"
                  : "border-[var(--color-border)] bg-white/60 hover:border-[var(--color-brand)]/40 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${
                    isActive
                      ? "bg-[var(--color-brand)]"
                      : "bg-[var(--color-muted-2)]"
                  }`}
                />
                <h3
                  className={`text-[16px] font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--color-brand)]"
                      : "text-[var(--color-ink)]"
                  }`}
                >
                  {platform.name}
                </h3>
              </div>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                {platform.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}