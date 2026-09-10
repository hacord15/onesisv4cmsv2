import { getCollection } from "@/lib/payload-fetch";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";

export const dynamic = "force-dynamic";

type TestimonialsProps = {
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  body?: string;
};

export async function Testimonials(props: TestimonialsProps) {
  const items = await getCollection("testimonials", { sort: "sortOrder" });       

  return <TestimonialsCarousel items={items} {...props} />;
}