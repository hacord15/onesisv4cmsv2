"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="border border-[var(--color-border)] bg-white">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-cream)] block cursor-pointer"
        >
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </button>
        <div className="p-6">
          <h3 className="font-display text-xl text-[var(--color-ink)]">{name}</h3>
          <div className="mt-1 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[var(--color-brand)]">
            {title}
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center bg-white/90 text-[var(--color-ink)] hover:bg-white"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 border-b border-[var(--color-border)] p-6">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-cream)]">
                <Image
                  src={photo}
                  alt={name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-xl text-[var(--color-ink)]">{name}</h3>
                <div className="mt-1 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[var(--color-brand)]">
                  {title}
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-[13.5px] leading-relaxed text-[var(--color-body)]">
                {bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}