// import Image from "next/image";
// import { Container } from "@/components/ui/Container";
// import { Button } from "@/components/ui/Button";
// import { hero } from "@/lib/content";

// export function Hero() {
//   return (
//     <section id="top" className="relative overflow-hidden bg-[var(--color-ink)]">
//       <div className="absolute inset-0">
//         <Image
//           src="/assests/hero-banner-img.jpg"
//           alt="Modern office interior managed by OneSIS"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-[var(--color-ink)]/55" />
//         <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/70 via-transparent to-[var(--color-ink)]/10" />
//       </div>

//       <Container className="relative flex flex-col gap-16 py-24 lg:flex-row lg:items-start lg:justify-between lg:py-32">
//         {/* Left: headline */}
//         <div className="max-w-xl">
//           <div className="mb-7 flex items-center gap-3">
//             <span className="h-px w-8 bg-[var(--color-brand)]" />
//             <span className="eyebrow text-[var(--color-brand)]">
//               {hero.eyebrow}
//             </span>
//           </div>

//           <h1 className="font-display text-[2.75rem] leading-[1.08] text-white sm:text-[3.5rem] lg:text-[4.25rem]">
//             {hero.heading[0]}
//             <br />
//             {hero.heading[1]}
//             <br />
//             <span className="accent text-[var(--color-brand)]">
//               {hero.headingAccent}
//             </span>
//           </h1>

//           <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/70">
//             {hero.body}
//           </p>

//           <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
//             <Button href="#verticals" variant="primary" icon>
//               {hero.primaryCta}
//             </Button>
//             <a
//               href="#contact"
//               className="text-[14px] text-white/80 underline underline-offset-4 decoration-white/40 transition-colors hover:text-white hover:decoration-white"
//             >
//               {hero.secondaryCta}
//             </a>
//           </div>
//         </div>

//         {/* Right: floating stat card */}
//         {/* <div className="w-full max-w-sm border border-white/15 bg-white/10 p-8 backdrop-blur-md sm:p-10 lg:mt-4">
//           {hero.stats.map((stat, i) => (
//             <div
//               key={stat.label}
//               className={`py-5 first:pt-0 last:pb-0 ${
//                 i !== hero.stats.length - 1 ? "border-b border-white/15" : ""
//               }`}
//             >
//               <div className="font-display text-3xl text-white sm:text-4xl">
//                 {stat.value}
//               </div>
//               <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/55">
//                 {stat.label}
//               </div>
//             </div>
//           ))}
//         </div> */}
//       </Container>

//       {/* Scroll indicator */}
//       <div className="relative hidden items-center justify-between border-t border-white/10 px-6 py-5 sm:flex lg:px-16">
//         <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
//           {hero.scrollLabel}
//         </span>
//         <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
//       </div>
//     </section>
//   );
// }





import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { mediaUrl } from "@/lib/payload-fetch";
import type { Home } from "@/payload-types";

export function Hero({ hero }: { hero: Home["hero"] }) {
  return (
    <section id="top" className="relative overflow-hidden bg-[var(--color-ink)]">
      <div className="absolute inset-0">
        <Image
          src={mediaUrl(hero.banner)}
          alt="Modern office interior managed by OneSIS"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Left dark -> right light */}
<div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/55 via-[var(--color-ink)]/25 to-transparent" />        {/* Bottom fade for scroll indicator area */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/60 via-transparent to-transparent" />
      </div>

      <Container className="relative flex flex-col gap-16 py-24 lg:flex-row lg:items-start lg:justify-between lg:py-32">
        {/* Left: headline */}
        <div className="max-w-xl">
          {/* <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--color-brand)]" />
            <span className="eyebrow text-[var(--color-brand)]">
              {hero.eyebrow}
            </span>
          </div> */}
          <div className="mb-7 flex items-center gap-3">
  <span className="h-px w-8 bg-[var(--color-brand)]" />
  <span className="eyebrow bg-[var(--color-brand)] !text-white">
    {hero.eyebrow}
  </span>
</div>

          {/* <h1 className="font-display text-[2.75rem] leading-[1.08] text-white sm:text-[3.5rem] lg:text-[4.25rem]"> */}
          <h1 className="font-display text-[2.25rem] leading-[1.1] text-white sm:text-[2.75rem] lg:text-[3.5rem]">
            {hero.heading?.[0]?.text}
            <br />
            {hero.heading?.[1]?.text}
            <br />
            <span className="accent text-[var(--color-brand)]">
              {hero.headingAccent}
            </span>
          </h1>

          {/* <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/70">
            {hero.body}
          </p> */}

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="#verticals" variant="primary" icon>
              {hero.primaryCta}
            </Button>
            
            {/* <a  href="#contact"
              className="text-[14px] text-white/80 underline underline-offset-4 decoration-white/40 transition-colors hover:text-white hover:decoration-white"
            >
              {hero.secondaryCta}
            </a> */}
          </div>
        </div>

        {/* Right: floating stat card */}
        {/* <div className="w-full max-w-sm border border-white/15 bg-white/10 p-8 backdrop-blur-md sm:p-10 lg:mt-4">
          {hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-5 first:pt-0 last:pb-0 ${
                i !== hero.stats.length - 1 ? "border-b border-white/15" : ""
              }`}
            >
              <div className="font-display text-3xl text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/55">
                {stat.label}
              </div>
            </div>
          ))}
        </div> */}
      </Container>

      {/* Scroll indicator */}
      <div className="relative hidden items-center justify-between border-t border-white/10 px-6 py-5 sm:flex lg:px-16">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
          {hero.scrollLabel}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
      </div>
    </section>
  );
}