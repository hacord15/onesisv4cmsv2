
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { accountability } from "@/lib/content";
import {
  User,
  Smile,
  Star,
  TrendingUp,
  Heart,
  Users,
} from "lucide-react";

// ─── Values data ──────────────────────────────────────────────────

const values = [
  {
    Icon: User,
    title: "WELLBEING\nAT THE CORE",
    description:
      "We create safe, healthy and future-ready environments that enhance wellbeing for every occupier.",
  },
  {
    Icon: Smile,
    title: "CLIENT DELIGHT /\nSATISFACTION",
    description:
      "Our focus on service excellence, responsiveness and transparency drives high client satisfaction and lasting partnerships.",
  },
  {
    Icon: Star,
    title: "WOW\nEXPERIENCES",
    description:
      "We go beyond expectations to deliver moments of wow that create lasting impressions.",
  },
  {
    Icon: Users,
    title: "PEOPLE FIRST.\nIMPACT ALWAYS.",
    description:
      "Empowered teams that care, perform and take pride in delivering value every single day.",
  },
  {
    Icon: TrendingUp,
    title: "MEASURABLE\nEXCELLENCE",
    description:
      "Data-led decisions, real-time insights and continuous improvement for superior outcomes.",
  },
];

const tagline =
  "Better Facilities. Better Experiences. Happier People. Stronger Businesses.";

const keywords = ["WELLBEING", "CLIENT DELIGHT", "WOW EXPERIENCES"];

// ─── Component ────────────────────────────────────────────────────

export function Accountability() {
  return (
    <section className="bg-[var(--color-cream)]">

      {/* ── Existing top section ─────────────────────────────── */}
      <Container className="py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>{accountability.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.5rem]">
              {accountability.heading}{" "}
              <span className="accent">{accountability.headingAccent}</span>
              <br />
              {accountability.headingTail}
            </h2>
          </div>
          <p className="max-w-md text-[14.5px] leading-relaxed text-[var(--color-body)]">
            {accountability.body}
          </p>
        </div>
      </Container>

      {/* ── Values Grid Section ──────────────────────────────── */}
      <div className="border-t border-[var(--color-border)] bg-white">
        <Container className="px-0 sm:px-8 lg:px-16">

          {/* 5-column values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 divide-y divide-[var(--color-border)] sm:divide-y-0 sm:divide-x">
            {values.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center sm:items-start gap-5 px-6 py-10 sm:px-7 xl:px-8"
              >
                {/* Icon — red outline, no fill */}
                <Icon
                  size={36}
                  strokeWidth={1.4}
                  className="text-[#8b1a1a] flex-shrink-0"
                />

                {/* Title — bold uppercase, red-black */}
                <h3 className="whitespace-pre-line text-center sm:text-left text-[12.5px] font-bold leading-snug tracking-[0.08em] text-[#8b1a1a] uppercase">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-center sm:text-left text-[13.5px] leading-relaxed text-[var(--color-body)]">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Horizontal rule */}
          <div className="border-t border-[var(--color-border)] mx-6 sm:mx-0" />

          {/* Tagline row */}
          <div className="flex flex-col items-center gap-4 px-6 py-8 sm:px-0 text-center">

            {/* Heart + tagline */}
            <div className="flex items-center gap-3">
              <Heart
                size={20}
                strokeWidth={1.5}
                className="flex-shrink-0 text-[#8b1a1a]"
              />
              <p className="text-[14.5px] leading-snug text-[#8b1a1a] font-light tracking-wide">
                {tagline}
              </p>
            </div>

            {/* Keyword pills separated by | */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {keywords.map((kw, i) => (
                <span key={kw} className="flex items-center gap-4 sm:gap-6">
                  <span className="text-[11.5px] font-extrabold tracking-[0.18em] text-[#8b1a1a] uppercase">
                    {kw}
                  </span>
                  {i < keywords.length - 1 && (
                    <span className="text-[#8b1a1a]/40 font-light text-lg select-none">
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>

          </div>

        </Container>
      </div>

    </section>
  );
}