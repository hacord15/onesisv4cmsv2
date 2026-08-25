"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { testimonials } from "@/lib/content";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_SLIDE_INTERVAL = 6000;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const items = testimonials.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, AUTO_SLIDE_INTERVAL);
  }, [items.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (index: number) => {
    setActiveIndex(((index % items.length) + items.length) % items.length);
    startTimer();
  };

  const active = items[activeIndex];

  return (
    <section className="bg-[var(--color-cream)] py-20">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow dash>{testimonials.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.5rem]">
              {testimonials.heading}{" "}
              <span className="accent">{testimonials.headingAccent}</span>
            </h2>
          </div>
          <p className="max-w-md text-[14.5px] leading-relaxed text-[var(--color-body)]">
            {testimonials.body}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-12">
          <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
            <div className="grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-[auto_1fr] lg:gap-14 lg:p-16">
              {/* Quote icon + avatar */}
              <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-6">
                <Quote
                  size={40}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--color-brand)]/25"
                />
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-tint)] font-display text-[16px] text-[var(--color-brand)] lg:h-16 lg:w-16 lg:text-[18px]">
                  {initials(active.name)}
                </div>
              </div>

              {/* Quote content */}
              <div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < active.rating
                          ? "fill-[var(--color-brand)] text-[var(--color-brand)]"
                          : "fill-transparent text-[var(--color-border)]"
                      }
                    />
                  ))}
                </div>

                <p className="mt-5 font-display text-[19px] leading-relaxed text-[var(--color-ink)] sm:text-[22px]">
                  &ldquo;{active.quote}&rdquo;
                </p>

                <div className="mt-7">
                  <div className="text-[14.5px] font-semibold text-[var(--color-ink)]">
                    {active.name}
                  </div>
                  <div className="mt-0.5 text-[13px] text-[var(--color-muted)]">
                    {active.title}, {active.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => goTo(activeIndex - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {items.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={`Show testimonial from ${item.name}`}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-6 bg-[var(--color-brand)]"
                      : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-brand)]/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => goTo(activeIndex + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
