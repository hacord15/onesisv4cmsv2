import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { outcomes, whereWeOperate } from "@/lib/content";
import { images } from "@/lib/images";

// Map each outcome item to an image — replace with dedicated
// outcomeOne..outcomeFour keys in lib/images.ts when available.
const outcomeImages = [
  images.operateThree,
  images.repairSpotlight,
  images.propertyManagement,
  images.operateTwo,
];

export function OutcomesAndOperations() {
  return (
    <section id="operate" className="bg-white">
      {/* Intro heading */}
      {/* <Container className="py-16 lg:pb-14 lg:pt-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>{outcomes.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.5rem]">
              {outcomes.heading[0]}
              <br />
              <span className="accent">{outcomes.headingAccent}</span>
            </h2>
          </div>
          <p className="max-w-md text-[14.5px] leading-relaxed text-[var(--color-body)]">
            {outcomes.body}
          </p>
        </div>
      </Container> */}

      {/* Merged block: stacked images (left) + 4 image+content columns (right) */}
      <div className="border-t border-[var(--color-border)]">
        <div className="flex flex-col lg:flex-row">
          {/* Left: two stacked images */}
          <div className="flex shrink-0 flex-col lg:w-1/5">
            <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:flex-1">
              <Image
                src={images.operateOne}
                alt="OneSIS field staff at work"
                fill
                sizes="(min-width: 1024px) 20vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:flex-1">
              <Image
                src={images.operateTwo}
                alt="Team working in office managed by OneSIS"
                fill
                sizes="(min-width: 1024px) 20vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: 4 columns, each with image + numbered content */}
          <div className="grid flex-1 grid-cols-1 divide-y divide-[var(--color-border)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {outcomes.items.map((item, i) => (
              <div key={item.index} className="flex flex-col">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={outcomeImages[i]}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 px-6 py-9 sm:px-7">
                  <span className="font-display text-3xl text-[var(--color-muted-2)]">
                    {item.index}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* whereWeOperate copy — retained below as supporting context */}
      {/* <Container className="border-t border-[var(--color-border)] py-14 lg:py-16">
        <div className="max-w-2xl">
          <h3 className="font-display text-2xl text-[var(--color-ink)] sm:text-3xl">
            {whereWeOperate.heading}{" "}
            <span className="accent">{whereWeOperate.headingAccent}</span>
          </h3>
          <p className="mt-4 text-[14.5px] leading-relaxed text-[var(--color-body)]">
            {whereWeOperate.body}
          </p>
        </div>
      </Container> */}
    </section>
  );
}