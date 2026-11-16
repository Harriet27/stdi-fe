import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MoveRight } from "lucide-react";
import { events } from "@/lib/vihara-data";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export default function Home() {
  const featured = events[0];
  return (
    <main id="beranda">
      <SiteHeader />
      <section className="hero wrap" aria-label="Acara utama">
        <Image
          src={featured.image}
          alt="Suasana pagi yang tenang di lingkungan stdi"
          fill
          priority
          sizes="(max-width: 800px) 100vw, 1200px"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow light">
            <i /> ACARA UTAMA · {featured.dateLabel.toUpperCase()}
          </span>
          <p className="hero-kicker">
            Momen berbagi, tumbuh, dan berlatih bersama
          </p>
          <h1>
            {featured.title === "Perayaan Kathina 2026" ? (
              <>
                Merayakan Kathina,
                <br />
                menumbuhkan kebaikan.
              </>
            ) : (
              featured.title
            )}
          </h1>
          <p className="hero-description">{featured.excerpt}</p>
          <Link href={`/agenda/${featured.slug}`} className="button-light">
            Lihat detail acara <ArrowRight size={16} />
          </Link>
        </div>
        <div className="hero-index">
          <span>01</span>
          <span className="index-line" />
          <span>04</span>
        </div>
        <span className="hero-caption">
          MENGHADIRKAN KEDAMAIAN DALAM KEHIDUPAN SEHARI-HARI
        </span>
      </section>
      <section className="intro wrap">
        <div className="section-index">
          01 <span>/</span> TENTANG KAMI
        </div>
        <div className="intro-copy">
          <h2>
            Ruang untuk berlatih,
            <br />
            <em>bertumbuh, dan berbagi.</em>
          </h2>
          <div className="intro-right">
            <p>
              STDI adalah rumah bagi siapa pun yang ingin mengenal Dhamma dan
              menumbuhkan kehidupan yang lebih penuh kesadaran, welas asih,
              serta kebijaksanaan.
            </p>
            <Link className="text-link" href="/tentang">
              Kenali organisasi kami <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="news-section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <div className="section-index">
                02 <span>/</span> KABAR & KEGIATAN
              </div>
              <h2>
                Yang sedang <em>berlangsung.</em>
              </h2>
            </div>
            <Link href="/agenda" className="text-link">
              Semua agenda <MoveRight size={16} />
            </Link>
          </div>
          <div className="news-grid">
            {events.slice(1, 4).map((event, i) => (
              <Link
                href={`/agenda/${event.slug}`}
                className="news-card"
                key={event.slug}
              >
                <div className={`news-visual visual-${i + 1}`}>
                  <Image
                    src={event.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 90vw, 380px"
                  />
                  <span className="visual-number">0{i + 2}</span>
                </div>
                <div className="news-meta">
                  <span>{event.category}</span>
                  <span>{event.dateLabel}</span>
                </div>
                <h3>{event.title}</h3>
                <p>{event.excerpt}</p>
                <span className="card-arrow" aria-hidden="true">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="home-links wrap">
        <Link href="/agenda">
          <span>03 / AGENDA</span>
          <strong>Kalender kegiatan</strong>
          <ArrowUpRight />
        </Link>
        <Link href="/tentang">
          <span>04 / PROFIL Organisasi</span>
          <strong>Visi, misi & organisasi</strong>
          <ArrowUpRight />
        </Link>
        <Link href="/sangha">
          <span>05 / PARA PEMBIMBING</span>
          <strong>Mengenal Sangha</strong>
          <ArrowUpRight />
        </Link>
      </section>
      <section className="visit-section" id="kontak">
        <div className="wrap visit-inner">
          <div>
            <div className="section-index light-index">
              06 <span>/</span> SAMPAI JUMPA
            </div>
            <h2>
              Selalu ada ruang
              <br />
              untuk <em>Anda.</em>
            </h2>
          </div>
          <div className="visit-details">
            <p>
              Datang untuk beribadah, belajar, atau sekadar mengenal suasana
              vihara. Pintu kami terbuka dengan hangat.
            </p>
            <div className="visit-line">
              <span>Jl. Kebajikan No. 8, Jakarta Selatan</span>
            </div>
            <div className="visit-line">
              <span>Setiap hari, 08.00 – 18.00 WIB</span>
            </div>
            <a href="mailto:halo@bodhikaruna.or.id" className="button-light">
              Hubungi sekretariat <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
