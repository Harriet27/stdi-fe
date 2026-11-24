import type { Metadata } from "next";
import { sangha } from "@/lib/vihara-data";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SanghaDirectory } from "@/components/sangha-directory";

export const metadata: Metadata = {
  title: "Sangha & Pembimbing",
  description: "Kenali para pembimbing Dhamma Vihara Bodhi Karuna.",
};

export default function SanghaIndexPage() {
  return (
    <main className="subpage">
      <SiteHeader />
      <section className="subpage-hero wrap">
        <div className="section-index">
          PARA PEMBIMBING <span>/</span> SANGHA
        </div>
        <h1>
          Sahabat dalam
          <br />
          <em>perjalanan Dhamma.</em>
        </h1>
        <p>
          Mengenal para anggota Sangha yang membimbing umat dalam belajar,
          berlatih, dan menjalani nilai-nilai Dhamma.
        </p>
      </section>

      <SanghaDirectory items={sangha} />

      <SiteFooter />
    </main>
  );
}