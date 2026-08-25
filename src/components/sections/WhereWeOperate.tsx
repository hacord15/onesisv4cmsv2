import Image from "next/image";
import { whereWeOperate } from "@/lib/content";
import { images } from "@/lib/images";

export function WhereWeOperate() {
  return (
    <section id="operate" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2">
        <div className="relative aspect-[4/5] lg:row-span-2 lg:aspect-auto">
          <Image
            src={images.operateOne}
            alt="OneSIS field staff at work"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <Image
            src={images.operateTwo}
            alt="Corporate interior maintained by OneSIS"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <Image
            src={images.operateThree}
            alt="Office corridor managed by OneSIS"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative flex flex-col justify-center overflow-hidden bg-[var(--color-cream)] px-6 py-14 sm:px-10 lg:col-span-2 lg:px-16">
          {/* Animated red effect — anchored to bottom-right, always visible */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="operate-blob-1 absolute bottom-[-20%] right-[5%] h-[300px] w-[300px] rounded-full bg-[#C8102E]/30 blur-[100px]" />
            <div className="operate-blob-2 absolute bottom-[-10%] right-[30%] h-[220px] w-[220px] rounded-full bg-[#e63946]/25 blur-[90px]" />
            <div className="operate-blob-3 absolute bottom-[10%] right-[-5%] h-[180px] w-[180px] rounded-full bg-[#C8102E]/20 blur-[80px]" />
          </div>

          <h2 className="relative z-10 font-display text-3xl text-[var(--color-ink)] sm:text-4xl">
            {whereWeOperate.heading}{" "}
            <span className="accent">{whereWeOperate.headingAccent}</span>
          </h2>
          <p className="relative z-10 mt-4 max-w-3xl text-[14.5px] leading-relaxed text-[var(--color-body)]">
            {whereWeOperate.body}
          </p>

          <style>{`
            @keyframes operateBlobPulse1 {
              0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
              50% { transform: translate(-15px, -20px) scale(1.15); opacity: 0.8; }
            }
            @keyframes operateBlobPulse2 {
              0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
              50% { transform: translate(20px, -10px) scale(1.1); opacity: 0.7; }
            }
            @keyframes operateBlobPulse3 {
              0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
              50% { transform: translate(-10px, 15px) scale(1.2); opacity: 0.6; }
            }
            .operate-blob-1 {
              animation: operateBlobPulse1 7s ease-in-out infinite;
            }
            .operate-blob-2 {
              animation: operateBlobPulse2 9s ease-in-out infinite;
            }
            .operate-blob-3 {
              animation: operateBlobPulse3 8s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}