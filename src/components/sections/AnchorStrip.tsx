import { Container } from "@/components/ui/Container";
import { anchorStrip } from "@/lib/content";

export function AnchorStrip() {
  return (
    <div className="border-b border-[var(--color-border-soft)] bg-[var(--color-offwhite)]">
      <Container>
        <div className="flex items-center justify-center gap-8 overflow-x-auto py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {anchorStrip.map((item, i) => (
            <div key={item} className="flex shrink-0 items-center gap-8">
              <span className="whitespace-nowrap transition-colors hover:text-[var(--color-ink)]">
                {item}
              </span>

              {i !== anchorStrip.length - 1 && (
                <span className="h-1 w-1 rounded-full bg-[var(--color-brand)]/50" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}