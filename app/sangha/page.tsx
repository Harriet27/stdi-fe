import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { sangha } from '@/lib/vihara-data'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'

export const metadata: Metadata = { title: 'Sangha & Pembimbing', description: 'Kenali para pembimbing Dhamma Vihara Bodhi Karuna.' }
export default function SanghaIndexPage() {
  return <main className="subpage"><SiteHeader /><section className="subpage-hero wrap"><div className="section-index">PARA PEMBIMBING <span>/</span> SANGHA</div><h1>Sahabat dalam<br /><em>perjalanan Dhamma.</em></h1><p>Mengenal para anggota Sangha yang membimbing umat dalam belajar, berlatih, dan menjalani nilai-nilai Dhamma.</p></section><section className="sangha-section wrap sangha-directory"><div className="section-heading"><div><div className="section-index">BODHI KARUNA <span>/</span> PEMBIMBING</div><h2>Berkenalan lebih <em>dekat.</em></h2></div><p className="heading-note">Pilih profil untuk mengenal<br />perjalanan dan bimbingannya.</p></div><div className="sangha-grid">{sangha.map((person, i) => <Link href={`/sangha/${person.slug}`} className="sangha-card" key={person.slug}><div className={`monk-portrait portrait-${i + 1}`}><div className="portrait-halo" /><span>{person.initials}</span><div className="portrait-label">SANGHA · BODHI KARUNA</div></div><div className="monk-info"><span>{person.role}</span><h3>{person.name}</h3><p>{person.years}</p><ArrowUpRight size={17} /></div><p className="sangha-card-bio">{person.bio}</p></Link>)}</div></section><SiteFooter /></main>
}
