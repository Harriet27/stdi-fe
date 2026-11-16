'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, ExternalLink } from 'lucide-react'

const reels = [
  { id: 'DfYZUqZTGSn', title: 'Momen kebersamaan', caption: 'Cuplikan hangat dari komunitas Vihara Bodhi Karuna.' },
  { id: 'DfV0bnazlmu', title: 'Belajar dan bertumbuh', caption: 'Berbagi langkah kecil dalam perjalanan Dhamma.' },
  { id: 'DfT3zgITTX_', title: 'Menjalani Dhamma', caption: 'Cerita dan inspirasi dari kegiatan vihara.' },
]

export function ReelsFeed() {
  const feedRef = useRef<HTMLDivElement>(null)
  const reelRefs = useRef<Array<HTMLElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const feed = feedRef.current
    if (!feed) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(Number((entry.target as HTMLElement).dataset.index))
          }
        }
      },
      { root: feed, threshold: 0.65 },
    )

    reelRefs.current.forEach((reel) => reel && observer.observe(reel))
    return () => observer.disconnect()
  }, [])

  function goToReel(index: number) {
    reelRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="reels-layout">
      <div className="reels-feed" ref={feedRef} tabIndex={0} aria-label="Daftar reels, gulir untuk berpindah video">
        {reels.map((reel, index) => (
          <article className="reel-slide" key={reel.id} data-index={index} ref={(element) => { reelRefs.current[index] = element }}>
            <div className="reel-player">
              <iframe
                src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                title={`Instagram reel: ${reel.title}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="reel-details">
              <div className="reel-counter">REEL {String(index + 1).padStart(2, '0')} <span>/ {String(reels.length).padStart(2, '0')}</span></div>
              <h2>{reel.title}</h2>
              <p>{reel.caption}</p>
              <a href={`https://www.instagram.com/reel/${reel.id}/`} target="_blank" rel="noreferrer">
                Buka di Instagram <ExternalLink size={15} aria-hidden="true" />
              </a>
              <div className="reel-navigation" aria-label="Navigasi reels">
                <button type="button" onClick={() => goToReel(index - 1)} disabled={index === 0} aria-label="Reel sebelumnya">
                  <ArrowUp size={17} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => goToReel(index + 1)} disabled={index === reels.length - 1} aria-label="Reel berikutnya">
                  <ArrowDown size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">Reel {activeIndex + 1} dari {reels.length}</p>
      <div className="reels-hint" aria-hidden="true"><span>GULIR UNTUK MENJELAJAHI</span><ArrowDown size={14} /></div>
    </div>
  )
}
