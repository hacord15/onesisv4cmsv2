import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { technology } from "@/lib/content";
import { images } from "@/lib/images";

const icons: Record<string, React.ReactNode> = {
  "One Point App": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="7" y="3" width="10" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  iOPS: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
"OneSIS FACTECH": (    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 20V10l8-6 8 6v10a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "M-Trainer": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6.5 12 3l8 3.5-8 3.5-8-3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7 8.7v5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export function TechPlatforms() {
  return (
    <section id="technology" className="bg-white">
      

      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
          <div className="bg-[var(--color-cream)] px-2 py-2 lg:bg-transparent lg:px-0 lg:py-0">
            <Eyebrow>{technology.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.14] text-[var(--color-ink)]">
              {technology.heading} <span className="accent">{technology.headingAccent}</span>
              <br />
              {technology.headingTail}
            </h2>
            <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-[var(--color-body)]">
              {technology.body}
            </p>
            <TextLink href="#technology" className="mt-6">
              {technology.cta}
            </TextLink>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
            {technology.platforms.map((platform) => (
              <div
                key={platform.name}
                className={`p-8 ${
                  platform.highlighted
                    ? "bg-[var(--color-brand-tint)]"
                    : "bg-white"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center border border-[var(--color-border)] bg-white text-[var(--color-brand)]">
                  {icons[platform.name]}
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-[var(--color-ink)]">
                  {platform.name}
                </h3>
                <div className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">
                  {platform.tag}
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
