import { getGlobal } from "@/lib/payload-fetch";
import { PartnershipPageClient } from "./PageClient";

export default async function PartnershipPage() {
  const [nav, footer] = await Promise.all([getGlobal("nav"), getGlobal("footer")]);
  return <PartnershipPageClient nav={nav} footer={footer} />;
}
