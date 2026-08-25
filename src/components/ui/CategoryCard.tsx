export function CategoryCard({
  title,
  lead,
  items,
}: {
  title: string;
  lead?: string;
  items: string[];
}) {
  return (
    <div className="border border-[var(--color-border)] bg-white p-7">
      <h3 className="text-[15px] font-semibold text-[var(--color-ink)]">
        {title}
      </h3>

      {lead && (
        <p className="mt-1.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)]">
          {lead}
        </p>
      )}

      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[13.5px] leading-relaxed text-[var(--color-body)]"
          >
            <span className="mt-0.5 shrink-0 text-[var(--color-brand)]">
              •
            </span>

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}