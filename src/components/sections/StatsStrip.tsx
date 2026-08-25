import { Container } from "@/components/ui/Container";
import { statsStrip } from "@/lib/content";

export function StatsStrip() {
  return (
    <div className="border-y border-[var(--color-border)] bg-white">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-y divide-[var(--color-border)] sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
          {statsStrip.map((stat) => (
            <div key={stat.label} className="px-6 py-8 first:pl-0 sm:first:pl-0">
              <div className="font-display text-3xl text-[var(--color-brand)] sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
