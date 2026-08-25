import { getGlobal } from "@/lib/payload-fetch";
import { ContactIndexPageClient } from "./PageClient";

export default async function ContactPage() {
  const [nav, footer] = await Promise.all([getGlobal("nav"), getGlobal("footer")]);
  return <ContactIndexPageClient nav={nav} footer={footer} />;
}
