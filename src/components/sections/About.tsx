import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";
import { mediaUrl } from "@/lib/payload-fetch";
import type { Home } from "@/payload-types";

export function About({ about }: { about: Home["about"] }) {
  return (
    <section id="about" className="bg-[var(--color-cream)] py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* Sidebar */}
          <div className="flex flex-row gap-4 lg:flex-col lg:gap-5">
            <Eyebrow className="lg:mb-2">{about.eyebrow}</Eyebrow>
            <div className="hidden flex-1 flex-col gap-5 lg:flex">
              {(about.facts ?? []).map((fact) => (
                <div
                  key={fact.label}
                  className="border border-[var(--color-border)] bg-white px-6 py-6"
                >
                  <div className="font-display text-3xl text-[var(--color-brand)]">
                    {fact.value}
                  </div>
                  <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div>
            <h2 className="font-display text-[2.25rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.75rem]">
              {about.heading?.[0]?.text}
              {/* <br />
              {about.heading[1]} */}
              <br />
              <span className="accent">{about.headingAccent}</span>
            </h2>

            {/* <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--color-body)]">
              {about.body}
            </p> */}

            <p className="mt-6 max-w-5xl text-[15px] leading-relaxed text-[var(--color-body)]">
              {about.body}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {(about.badges ?? []).map((badge) => (
                <Tag key={badge.label}>{badge.label}</Tag>
              ))}
            </div>

            {/* Mobile-only fact boxes */}
            <div className="mt-8 grid grid-cols-2 gap-4 lg:hidden">
              {(about.facts ?? []).map((fact) => (
                <div
                  key={fact.label}
                  className="border border-[var(--color-border)] bg-white px-5 py-5"
                >
                  <div className="font-display text-2xl text-[var(--color-brand)]">
                    {fact.value}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-10 aspect-[16/7] w-full overflow-hidden">
              <Image
                src={mediaUrl(about.image)}
                alt="Commercial towers managed by OneSIS"
                fill
                sizes="(min-width: 1024px) 1100px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
