import Image from "next/image";

export function ProfileCard({
  photo,
  name,
  title,
  bio,
}: {
  photo: string;
  name: string;
  title: string;
  bio: string;
}) {
  return (
    <div className="border border-[var(--color-border)] bg-white">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-cream)]">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover "
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-[var(--color-ink)]">{name}</h3>
        <div className="mt-1 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[var(--color-brand)]">
          {title}
        </div>
        <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-body)]">
          {bio}
        </p>
      </div>
    </div>
  );
}