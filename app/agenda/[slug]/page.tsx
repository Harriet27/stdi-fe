import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, Clock3, MapPin } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { events } from "@/lib/vihara-data";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  return { title: event?.title ?? "Agenda", description: event?.excerpt };
}
export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();
  return (
    <main className="detail-page">
      <SiteHeader />
      <div className="wrap detail-back">
        <Link className="back-link" href="/agenda">
          <ArrowLeft size={16} /> Kembali ke agenda
        </Link>
      </div>
      <article className="event-article wrap">
        <div className="section-index">
          AGENDA VIHARA <span>/</span> {event.category}
        </div>
        <h1>{event.title}</h1>
        <p className="event-lead">{event.excerpt}</p>
        <div className="event-facts">
          <span>
            <CalendarDays size={16} />
            {event.dateLabel}
          </span>
          <span>
            <Clock3 size={16} />
            {event.time}
          </span>
          <span>
            <MapPin size={16} />
            {event.location}
          </span>
        </div>
        <div className="event-cover">
          <Image
            src={event.image}
            alt={`Ilustrasi suasana untuk ${event.title}`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1100px"
          />
        </div>
        <div className="event-body">
          <div className="event-body-label">TENTANG KEGIATAN</div>
          <div>
            <p>{event.body}</p>
            <div className="event-callout">
              <span>Semua umat dan keluarga dipersilakan hadir.</span>
              <span>Semoga pertemuan ini membawa manfaat bagi semua.</span>
            </div>
            <Link href="/agenda" className="text-link">
              Jelajahi agenda lainnya <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
