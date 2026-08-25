import { ReactNode } from "react";
import { Container } from "./Container";

export function PageHero({
  eyebrow,
  heading,
  description,
  backgroundImage,
}: {
  eyebrow: string;
  heading: ReactNode;
  description?: string;
  backgroundImage?: string;
}) {
  return (
    <section className="relative overflow-hidden px-6 pb-14 pt-24 sm:px-10 lg:px-16">
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      )}

      {/* Dark Overlay */}
<div className="absolute inset-0 bg-[rgba(16,22,29,0.45)]" />
      {/* Content */}
      <Container className="relative z-10 px-0">
        <p className="eyebrow">{eyebrow}</p>

        <h1 className="mt-5 max-w-3xl font-display text-[2.25rem] leading-[1.16] text-white sm:text-[3rem]">
          {heading}
        </h1>

        {description && (
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/80">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}