"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";





const AUTO_SLIDE_INTERVAL = 6000;
const CARDS_PER_SLIDE = 2;

export type TestimonialItem = {
  id: string | number;
  quote: string;
  name: string;
  title?: string | null;
  company?: string | null;
  rating: number;
};

type TestimonialsProps = {
  items: TestimonialItem[];
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  body?: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function Testimonials({
  items,
  eyebrow = "Client Voices",
  heading = "What Our",
  headingAccent = "Clients Say",
  body = "Real feedback from the facility owners, developers, and corporate teams who trust OneSIS with their operations every day.",
}: TestimonialsProps) {
  const slides = chunk(items, CARDS_PER_SLIDE);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_SLIDE_INTERVAL);
  }, [slides.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  if (items.length === 0) return null;

  const goTo = (index: number) => {
    setActiveIndex(((index % slides.length) + slides.length) % slides.length);
    startTimer();
  };

  const activeSlide = slides[activeIndex];

  return (
    <section className="bg-[var(--color-cream)] py-20">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow dash>{eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.5rem]">
              {heading}{" "}
              <span className="accent">{headingAccent}</span>
            </h2>
          </div>
          <p className="max-w-md text-[14.5px] leading-relaxed text-[var(--color-body)]">
            {body}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {activeSlide.map((active) => (
              <div
                key={active.id}
                className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm"
              >
                <div className="flex flex-col gap-6 p-8 sm:p-10">
                  <div className="flex items-center gap-4">
                    <Quote
                      size={36}
                      strokeWidth={1.5}
                      className="shrink-0 text-[var(--color-brand)]/25"
                    />
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-tint)] font-display text-[16px] text-[var(--color-brand)]">
                      {initials(active.name)}
                    </div>
                  </div>

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

                    <p className="mt-5 font-display text-[18px] leading-relaxed text-[var(--color-ink)] sm:text-[20px]">
                      &ldquo;{active.quote}&rdquo;
                    </p>

                    <div className="mt-7">
                      <div className="text-[14.5px] font-semibold text-[var(--color-ink)]">
                        {active.name}
                      </div>
                      {(active.title || active.company) && (
                        <div className="mt-0.5 text-[13px] text-[var(--color-muted)]">
                          {[active.title, active.company].filter(Boolean).join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          {slides.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                aria-label="Previous testimonials"
                onClick={() => goTo(activeIndex - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Show testimonials group ${index + 1}`}
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
                aria-label="Next testimonials"
                onClick={() => goTo(activeIndex + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}