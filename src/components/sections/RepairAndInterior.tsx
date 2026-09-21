
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { hardcoreRepair, propertyManagement } from "@/lib/content";
import { images } from "@/lib/images";

export function RepairAndInterior() {
  return (
    <>
      {/* Hardcore Repair — image left, content right */}
      <section className="bg-white py-5 lg:py-5">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={images.ifmmain}
                alt="Hardcore repair services"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-white px-6 py-4">
                <div className="font-display text-lg text-[var(--color-ink)]">
                  {hardcoreRepair.imageCaption}
                </div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  {hardcoreRepair.imageSubcaption}
                </div>
              </div>
            </div>

            <div className="max-w-lg">
              <Eyebrow>{hardcoreRepair.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl leading-[1.12] text-[var(--color-ink)] sm:text-4xl">
                {hardcoreRepair.heading}
                <br />
                <span className="accent">{hardcoreRepair.headingAccent}</span>
              </h2>
              <p className="mt-5 text-[14.5px] leading-relaxed text-[var(--color-body)]">
                {hardcoreRepair.body}
              </p>
              {/* ADD HEADING HERE SECTORS WE OPERATE */}
              <h3 className="mt-6 font-display text-xl text-[var(--color-ink)]">
                {hardcoreRepair.sectorsHeading}
              </h3>
              <ul className="mt-6 flex flex-col">
                {hardcoreRepair.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 border-t border-[var(--color-border)] py-3.5 text-[14px] text-[var(--color-body)] last:border-b"
                  >
                    <span className="h-px w-4 shrink-0 bg-[var(--color-brand)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <TextLink href="/solutions/integrated-fm" className="mt-7">
                {hardcoreRepair.cta}
              </TextLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Property Management — image right, content left */}
      <section className="bg-white py-5 lg:py-5">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-lg lg:order-1">
              <Eyebrow>{propertyManagement.eyebrow}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl leading-[1.12] text-[var(--color-ink)] sm:text-4xl">
                {propertyManagement.heading}
                <br />
                <span className="accent">{propertyManagement.headingAccent}</span>
              </h2>
              <p className="mt-5 text-[14.5px] leading-relaxed text-[var(--color-body)]">
                {propertyManagement.body}
              </p>
              <h3 className="mt-6 font-display text-xl text-[var(--color-ink)]">
                {propertyManagement.sectorsHeading}
              </h3>
              <ul className="mt-6 flex flex-col">
                {propertyManagement.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 border-t border-[var(--color-border)] py-3.5 text-[14px] text-[var(--color-body)] last:border-b"
                  >
                    <span className="h-px w-4 shrink-0 bg-[var(--color-brand)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <TextLink href="/solutions/property-management" className="mt-7">
                {propertyManagement.cta}
              </TextLink>
            </div>

            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4] lg:order-2 lg:aspect-[4/5]">
              <Image
                src={images.pmsmain}
                alt="Property management services"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-white px-6 py-4">
                <div className="font-display text-lg text-[var(--color-ink)]">
                  {propertyManagement.imageCaption}
                </div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  {propertyManagement.imageSubcaption}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}