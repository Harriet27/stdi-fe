import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";
import logostdi from "../assets/logo-stdi.png";

const navItems = [
  ['Beranda', '/'],
  ['Tentang Kami', '/tentang'],
  ['Agenda', '/agenda'],
  ['Reels', '/reels'],
  ['Sangha', '/sangha'],
  ['Kontak', '/#kontak'],
]

export function SiteHeader() {
  return (
    <>
      <div className="topline">
        <span>JALAN DAMAI, HATI TERBUKA</span>
        <span>TERBUKA UNTUK SEMUA</span>
      </div>
      <header className="site-header wrap">
        <Link href="/" className="brand" aria-label="STDI, beranda">
          <Image
            src={logostdi}
            alt="logo-stdi"
            height={50}
            width={50}
          />
          <span>
            <strong>STDI</strong>
            <small style={{ textTransform: 'uppercase' }}>
              Saṅgha Theravāda Dhammayut Indonesia
            </small>
          </span>
        </Link>
        <nav aria-label="Navigasi utama">
          {navItems.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/#kontak" className="header-cta">
          Kunjungi Vihara <ArrowUpRight size={15} />
        </Link>
        <details className="mobile-nav">
          <summary aria-label="Buka navigasi">
            <Menu />
          </summary>
          <div>
            {navItems.map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </div>
        </details>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <Link href="/" className="brand">
        <span className="brand-mark">B</span>
        <span>
          <strong>STDI</strong>
          <small>VIHARA & PUSAT DHAMMA</small>
        </span>
      </Link>
      <p>Semoga semua makhluk berbahagia.</p>
      <span>© 2026 STDI</span>
    </footer>
  );
}
