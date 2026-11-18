import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { sangha } from "@/lib/vihara-data";

export function generateStaticParams() {
  return sangha.map((person) => ({ slug: person.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = sangha.find((item) => item.slug === slug);
  return { title: person?.name ?? "Sangha", description: person?.bio };
}
export default async function SanghaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = sangha.find((item) => item.slug === slug);
  if (!person) notFound();
  const index = sangha.indexOf(person) + 1;
  return (
    <main className="detail-page">
      <SiteHeader />
      <div className="wrap detail-back">
        <Link className="back-link" href="/sangha">
          <ArrowLeft size={16} /> Kembali ke Sangha
        </Link>
      </div>
      <article className="profile-page wrap">
        <div className="profile-art">
          <div className={`monk-portrait portrait-${index}`}>
            <div className="portrait-halo" />
            <span>{person.initials}</span>
            <div className="portrait-label">SANGHA · BODHI KARUNA</div>
          </div>
          <div className="profile-art-note">
            <Sparkles size={16} /> Menapaki jalan Dhamma bersama
          </div>
        </div>
        <div className="profile-copy">
          <div className="section-index">
            PARA PEMBIMBING <span>/</span> PROFIL
          </div>
          <span className="profile-role">{person.role}</span>
          <h1>{person.name}</h1>
          <p className="profile-years">{person.years}</p>
          <div className="profile-rule" />
          <p className="profile-bio">{person.bio}</p>
          <p className="profile-bio">
            Dengan keteladanan dan bimbingan, Sangha mendampingi umat untuk
            memahami ajaran Buddha, mempraktikkannya dalam keseharian, dan
            membagikan manfaatnya kepada sesama.
          </p>
          <div className="profile-quote">
            <Heart size={17} />
            <span>
              “Semoga latihan kita membawa kedamaian bagi diri sendiri dan semua
              makhluk.”
            </span>
          </div>
          <Link href="/sangha" className="text-link">
            Lihat pembimbing lainnya <ArrowLeft size={16} />
          </Link>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
