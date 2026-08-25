import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { outcomes } from "@/lib/content";

export function FourOutcomes() {
  return (
    <section className="bg-[var(--color-cream)]">
      <Container className="py-16 lg:py-20">
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
      </Container>

      <div className="border-t border-[var(--color-border)] bg-white">
        <Container className="px-0 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 divide-y divide-[var(--color-border)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {outcomes.items.map((item) => (
              <div key={item.index} className="px-6 py-10 sm:px-8">
                <span className="font-display text-4xl text-[var(--color-muted-2)]">
                  {item.index}
                </span>
                <h3 className="mt-4 font-display text-xl text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--color-body)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
