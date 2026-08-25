import { getGlobal } from "@/lib/payload-fetch";
import { SISGroupPageClient } from "./PageClient";

export default async function SISGroupPage() {
  const [nav, footer] = await Promise.all([getGlobal("nav"), getGlobal("footer")]);
  return <SISGroupPageClient nav={nav} footer={footer} />;
}
