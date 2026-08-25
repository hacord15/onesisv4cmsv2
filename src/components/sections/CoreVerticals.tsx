import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";
import { mediaUrl } from "@/lib/payload-fetch";
import type { Home } from "@/payload-types";

export function CoreVerticals({ verticals }: { verticals: Home["verticals"] }) {
  return (
    <section id="verticals" className="bg-white py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-8 border-b border-[var(--color-border)] pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow dash>{verticals.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-[2.25rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.75rem]">
              {verticals.heading}
              <br />
              <span className="accent">{verticals.headingAccent}</span>
            </h2>
          </div>
          <p className="max-w-xl text-[15px] leading-relaxed text-[var(--color-body)] lg:text-right">
  {verticals.body}
</p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {(verticals.items ?? []).map((item) => (
            <div
              key={item.index}
              className="group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={mediaUrl(item.image)}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <div className="pt-6">
                <span className="eyebrow">{item.index}</span>
                <h3 className="mt-3 font-display text-xl leading-snug text-[var(--color-ink)] transition-opacity duration-300 group-hover:opacity-70">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(item.tags ?? []).map((tag) => (
                    <Tag
                      key={tag.label}
                      className="px-2.5 py-1 text-[10px] transition-colors duration-300 group-hover:border-[var(--color-ink)]"
                    >
                      {tag.label}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}