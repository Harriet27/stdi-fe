import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, MapPin, Menu, MoveRight, Sparkles } from 'lucide-react'
import { events, sangha } from '@/lib/vihara-data'
import { EventCalendar } from '@/components/event-calendar'

const navItems = [
  ['Beranda', '#beranda'], ['Tentang Kami', '#tentang'], ['Agenda', '#agenda'], ['Sangha', '#sangha'], ['Kontak', '#kontak'],
]

export default function Home() {
  const featured = events[0]
  return (
    <main id="beranda">
      <div className="topline"><span>JALAN DAMAI, HATI TERBUKA</span><span>TERBUKA UNTUK SEMUA</span></div>
      <header className="site-header wrap">
        <Link href="#beranda" className="brand" aria-label="Bodhi Karuna, beranda"><span className="brand-mark">B</span><span><strong>BODHI KARUNA</strong><small>VIHARA & PUSAT DHAMMA</small></span></Link>
        <nav aria-label="Navigasi utama">{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
        <a href="#agenda" className="header-cta">Kunjungi Vihara <ArrowUpRight size={15} /></a>
        <details className="mobile-nav"><summary aria-label="Buka navigasi"><Menu /></summary><div>{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div></details>
      </header>
      <section className="hero wrap" aria-label="Acara utama">
        <Image src={featured.image} alt="Suasana pagi yang tenang di lingkungan vihara" fill priority sizes="(max-width: 800px) 100vw, 1200px" className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content"><span className="eyebrow light"><i /> ACARA UTAMA · 22 NOVEMBER 2026</span><p className="hero-kicker">Momen berbagi, tumbuh, dan berlatih bersama</p><h1>Merayakan Kathina,<br />menumbuhkan kebaikan.</h1><p className="hero-description">Satu hari untuk bersyukur, berbagi, dan mempererat kebersamaan dalam Dhamma.</p><Link href={`/agenda/${featured.slug}`} className="button-light">Lihat detail acara <ArrowRight size={16} /></Link></div>
        <div className="hero-index"><span>01</span><span className="index-line" /><span>04</span></div>
        <span className="hero-caption">MENGHADIRKAN KEDAMAIAN DALAM KEHIDUPAN SEHARI-HARI</span>
      </section>
      <section className="intro wrap" id="tentang"><div className="section-index">01 <span>/</span> TENTANG KAMI</div><div className="intro-copy"><h2>Ruang untuk berlatih,<br /><em>bertumbuh, dan berbagi.</em></h2><div className="intro-right"><p>Vihara Bodhi Karuna adalah rumah bagi siapa pun yang ingin mengenal Dhamma dan menumbuhkan kehidupan yang lebih penuh kesadaran, welas asih, serta kebijaksanaan.</p><a className="text-link" href="#visi-misi">Kenali vihara kami <MoveRight size={16} /></a></div></div></section>
      <section className="news-section"><div className="wrap"><div className="section-heading"><div><div className="section-index">02 <span>/</span> KABAR & KEGIATAN</div><h2>Yang sedang <em>berlangsung.</em></h2></div><a href="#agenda" className="text-link">Semua agenda <MoveRight size={16} /></a></div><div className="news-grid">{events.slice(1, 4).map((event, i) => <Link href={`/agenda/${event.slug}`} className="news-card" key={event.slug}><div className={`news-visual visual-${i + 1}`}><Image src={event.image} alt="" fill sizes="(max-width: 700px) 90vw, 380px" /><span className="visual-number">0{i + 2}</span></div><div className="news-meta"><span>{event.category}</span><span>{event.dateLabel}</span></div><h3>{event.title}</h3><p>{event.excerpt}</p><span className="card-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span></Link>)}</div></div></section>
      <section className="calendar-section wrap" id="agenda"><div className="calendar-intro"><div className="section-index">03 <span>/</span> KALENDER KEGIATAN</div><h2>Temukan waktu<br />untuk <em>hadir.</em></h2><p>Setiap pertemuan adalah kesempatan untuk belajar dan menguatkan kebajikan. Kami menantikan kehadiran Anda.</p><div className="calendar-note"><CalendarDays size={17} /><span>Semua kegiatan terbuka untuk umum</span></div></div><EventCalendar events={events} /></section>
      <section className="values-band" id="visi-misi"><div className="wrap values-grid"><div><div className="section-index light-index">04 <span>/</span> ARAH & NILAI</div><h2>Hidup dengan<br /><em>hati yang terjaga.</em></h2><p>Menjadi ruang spiritual yang inklusif, tempat setiap orang dapat belajar mengakhiri penderitaan dan menumbuhkan kebahagiaan bersama.</p></div><div className="value-list"><article><span>01</span><div><h3>Visi</h3><p>Terwujudnya masyarakat yang damai dan bijaksana melalui praktik Dhamma dalam kehidupan sehari-hari.</p></div></article><article><span>02</span><div><h3>Misi</h3><p>Menyediakan pembelajaran Dhamma, mendampingi latihan meditasi, dan menebarkan kasih melalui pelayanan sosial.</p></div></article><article><span>03</span><div><h3>Nilai kami</h3><p>Kebijaksanaan · Welas asih · Kesederhanaan · Kebersamaan</p></div></article></div></div></section>
      <section className="sangha-section wrap" id="sangha"><div className="section-heading"><div><div className="section-index">05 <span>/</span> PARA PEMBIMBING</div><h2>Mengenal <em>Sangha.</em></h2></div><p className="heading-note">Sahabat dalam perjalanan<br />mengenal dan mempraktikkan Dhamma.</p></div><div className="sangha-grid">{sangha.map((person, i) => <Link href={`/sangha/${person.slug}`} className="sangha-card" key={person.slug}><div className={`monk-portrait portrait-${i + 1}`}><div className="portrait-halo" /><span>{person.initials}</span><div className="portrait-label">SANGHA · BODHI KARUNA</div></div><div className="monk-info"><span>{person.role}</span><h3>{person.name}</h3><p>{person.years}</p><ArrowUpRight size={17} /></div></Link>)}</div></section>
      <section className="organization wrap"><div><div className="section-index">06 <span>/</span> ORGANISASI</div><h2>Bertumbuh dalam<br /><em>kebersamaan.</em></h2><p>Pelayanan vihara tumbuh dari kerja bersama Sangha dan umat. Setiap peran menjaga ruang ini tetap terbuka, hangat, dan bermanfaat.</p></div><div className="org-chart"><div className="org-node org-top"><Sparkles size={15} /><span>PEMBIMBING SPIRITUAL</span><strong>Sangha Vihara</strong></div><div className="org-connector" /><div className="org-node org-mid"><span>KOORDINASI PELAYANAN</span><strong>Pengurus Vihara</strong></div><div className="org-branches"><div className="org-node"><span>PEMBINAAN</span><strong>Pendidikan Dhamma</strong></div><div className="org-node"><span>KEBERSAMAAN</span><strong>Umat & Relawan</strong></div><div className="org-node"><span>KEPEDULIAN</span><strong>Pelayanan Sosial</strong></div></div></div></section>
      <section className="visit-section" id="kontak"><div className="wrap visit-inner"><div><div className="section-index light-index">07 <span>/</span> SAMPAI JUMPA</div><h2>Selalu ada ruang<br />untuk <em>Anda.</em></h2></div><div className="visit-details"><p>Datang untuk beribadah, belajar, atau sekadar mengenal suasana vihara. Pintu kami terbuka dengan hangat.</p><div className="visit-line"><MapPin size={17} /><span>Jl. Kebajikan No. 8, Jakarta Selatan</span></div><div className="visit-line"><Clock3 size={17} /><span>Setiap hari, 08.00 – 18.00 WIB</span></div><a href="mailto:halo@bodhikaruna.or.id" className="button-light">Hubungi sekretariat <ArrowRight size={16} /></a></div></div></section>
      <footer className="site-footer wrap"><Link href="#beranda" className="brand"><span className="brand-mark">B</span><span><strong>BODHI KARUNA</strong><small>VIHARA & PUSAT DHAMMA</small></span></Link><p>Semoga semua makhluk berbahagia.</p><span>© 2026 Vihara Bodhi Karuna</span></footer>
    </main>
  )
}
