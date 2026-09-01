

import {
  MapPin,
  Building2,
  Users2,
  Boxes,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/lib/images";
import IndiaPresenceMap from "@/components/sections/IndiaPresenceMap";

import { getGlobal } from "@/lib/payload-fetch";

/* ---------- data ---------- */
const presence = [
  {
    value: "29",
    label: "States",
    copy: "Pan-India coverage across all major and tier-2 cities.",
    icon: MapPin,
  },
  {
    value: "630+",
    label: "Districts",
    copy: "Deep local presence enabling last-mile service delivery.",
    icon: Boxes,
  },
  {
    value: "368",
    label: "Offices",
    copy: "Network of regional and branch offices for on-ground accountability.",
    icon: Building2,
  },
  {
    value: "16",
    label: "Group Companies",
    copy: "Integrated capabilities drawn from across the SIS Group ecosystem.",
    icon: Users2,
  },
];

/* ---------- component ---------- */
export default async function PresenceMapPage() {
  const nav = await getGlobal("nav");
  const footer = await getGlobal("footer");

  return (
    <>
      <Header nav={nav} />

      <main className="bg-white">
        {/* HERO */}
        <PageHero
          eyebrow="Our Presence"
          heading={
            <>
              Pan-India <span className="accent">footprint</span>
            </>
          }
          description="OneSIS delivers facility management across 29 states, 630+ districts, and 368 offices – covering every corner of India."
          backgroundImage={images.contactBanner}
        />

        {/* STATS STRIP */}
        <Container className="relative -mt-8 pb-16">
          <div className="grid grid-cols-2 gap-px overflow-hidden bg-white/10 shadow-lg lg:grid-cols-4">
            {presence.map(({ value, label, copy, icon: Icon }) => (
              <div
                key={label}
                className="bg-white p-6 backdrop-blur-sm"
              >
                <Icon
                  className="mb-4 h-5 w-5 text-[var(--color-brand)]"
                  strokeWidth={1.75}
                />

                <div className="font-display text-3xl leading-none text-[var(--color-ink)]">
                  {value}
                </div>

                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">
                  {label}
                </div>

                <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-body)]">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </Container>

        {/* INTERACTIVE MAP */}
        <section className="py-16">
          <Container>
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow text-[var(--color-brand)]">
                Interactive presence map
              </p>

              <h2 className="mt-3 font-display text-[2rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.5rem]">
                29 states · 630+ districts ·{" "}
                <span className="accent">368 offices</span>
              </h2>
            </div>

            <IndiaPresenceMap />
          </Container>
        </section>

        {/* ADDITIONAL INFORMATION */}
        <section className="bg-[var(--color-cream)] py-16">
          <Container>
            <div className="max-w-2xl">
              <h2 className="font-display text-[2rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2.5rem]">
                Wherever you are,{" "}
                <span className="accent">we are near.</span>
              </h2>

              <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-body)]">
                Our network of regional offices and on-ground teams ensures
                rapid response, local expertise, and consistent service quality
                across the country.
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer footer={footer} />
    </>
  );
}