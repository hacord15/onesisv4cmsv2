import { getGlobal } from "@/lib/payload-fetch";
import { ContactFormPageClient } from "./PageClient";

export default async function ContactPage() {
  const [nav, footer] = await Promise.all([getGlobal("nav"), getGlobal("footer")]);
  return <ContactFormPageClient nav={nav} footer={footer} />;
}
