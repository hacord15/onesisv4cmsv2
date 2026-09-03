import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { getGlobal, getCollection, mediaUrl } from "@/lib/payload-fetch";

export const dynamic = "force-dynamic";


export const metadata = {
  title: "Management Team | OneSIS",
};

export default async function ManagementPage() {
  const [nav, footer, pageIntro, managementTeam] = await Promise.all([
    getGlobal("nav"),
    getGlobal("footer"),
    getGlobal("company-management-page"),
    getCollection("management-team", { sort: "order" }),
  ]);

  return (
    <>
      <Header nav={nav} />
      <main className="bg-white">
        <PageHero
          eyebrow={pageIntro.eyebrow}
          heading={<span className="accent">{pageIntro.heading}</span>}
          description={pageIntro.body ?? undefined}
          backgroundImage={mediaUrl(pageIntro.banner)}
        />

        <section className="py-20">
          <Container>
            <Eyebrow>Management Team</Eyebrow>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {managementTeam.map((member) => (
                <ProfileCard
                  key={member.id}
                  photo={mediaUrl(member.photo)}
                  name={member.name}
                  title={member.title}
                  bio={member.bio ?? ""}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer footer={footer} />
    </>
  );
}