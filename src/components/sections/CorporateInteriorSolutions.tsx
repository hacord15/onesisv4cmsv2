import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { corporateInterior } from "@/lib/content";
import { images } from "@/lib/images";

export function CorporateInteriorSolutions() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image – now on the left */}
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={images.operateTwo}
              alt="Corporate interior fitout managed by OneSIS"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-white px-6 py-4">
              <div className="font-display text-lg text-[var(--color-ink)]">
                {corporateInterior.imageCaption}
              </div>
              <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                {corporateInterior.imageSubcaption}
              </div>
            </div>
          </div>

          {/* Content – now on the right */}
          <div className="max-w-lg">
            <Eyebrow>{corporateInterior.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-[1.12] text-[var(--color-ink)] sm:text-4xl">
              {corporateInterior.heading}
              <br />
              <span className="accent">{corporateInterior.headingAccent}</span>
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-[var(--color-body)]">
              {corporateInterior.body}
            </p>
            <h3 className="mt-6 font-display text-xl text-[var(--color-ink)]">
                            {corporateInterior.sectorsHeading}
                          </h3>
            <ul className="mt-6 flex flex-col">
              {corporateInterior.checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-t border-[var(--color-border)] py-3.5 text-[14px] text-[var(--color-body)] last:border-b"
                >
                  <span className="h-px w-4 shrink-0 bg-[var(--color-brand)]" />
                  {item}
                </li>
              ))}
            </ul>
            <TextLink href="/solutions/infrastructure-care" className="mt-7">
              {corporateInterior.cta}
            </TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}