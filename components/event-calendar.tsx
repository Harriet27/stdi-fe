'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from 'lucide-react'

type EventItem = { slug: string; title: string; category: string; date: string; dateLabel: string; time: string; location: string; excerpt: string; image: string }
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const weekdays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

export function EventCalendar({ events }: { events: EventItem[] }) {
  const [month, setMonth] = useState(10)
  const [year, setYear] = useState(2026)
  const days = useMemo(() => {
    const first = new Date(year, month, 1).getDay()
    const offset = (first + 6) % 7
    const total = new Date(year, month + 1, 0).getDate()
    return [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)]
  }, [month, year])
  const changeMonth = (delta: number) => {
    const next = new Date(year, month + delta, 1)
    setMonth(next.getMonth()); setYear(next.getFullYear())
  }
  const byDay = new Map(events.filter((event) => { const date = new Date(`${event.date}T12:00:00`); return date.getMonth() === month && date.getFullYear() === year }).map((event) => [Number(event.date.slice(-2)), event]))
  const upcoming = events.filter((event) => { const date = new Date(`${event.date}T12:00:00`); return date.getMonth() === month && date.getFullYear() === year })
  return <div className="calendar-card"><div className="calendar-top"><div><span className="calendar-overline">AGENDA VIHARA</span><h3>{months[month]} <span>{year}</span></h3></div><div className="calendar-controls"><button aria-label="Bulan sebelumnya" onClick={() => changeMonth(-1)}><ArrowLeft size={17} /></button><button aria-label="Bulan berikutnya" onClick={() => changeMonth(1)}><ArrowRight size={17} /></button></div></div><div className="calendar-grid">{weekdays.map((day) => <span className="weekday" key={day}>{day}</span>)}{days.map((day, index) => { const event = day ? byDay.get(day) : undefined; return <div className="calendar-cell" key={`${year}-${month}-${index}`}>{day && (event ? <Link href={`/agenda/${event.slug}`} className="calendar-day has-event" aria-label={`${day} ${months[month]}: ${event.title}`}>{day}<i /></Link> : <span className="calendar-day">{day}</span>)}</div> })}</div><div className="calendar-upcoming"><div className="upcoming-heading"><span><CalendarDays size={15} /> AGENDA BULAN INI</span><span>{upcoming.length} kegiatan</span></div>{upcoming.length ? upcoming.map((event) => <Link className="upcoming-item" href={`/agenda/${event.slug}`} key={event.slug}><span className="upcoming-date">{event.date.slice(-2)}<small>{months[month].slice(0, 3).toUpperCase()}</small></span><span className="upcoming-copy"><strong>{event.title}</strong><small><MapPin size={12} /> {event.location}</small></span><ArrowRight size={16} /></Link>) : <p className="calendar-empty">Belum ada agenda bulan ini.</p>}</div></div>
}
