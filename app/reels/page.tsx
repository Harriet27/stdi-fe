import type { Metadata } from 'next'
import { ReelsFeed } from '@/components/reels-feed'
import { SiteHeader } from '@/components/site-chrome'

export const metadata: Metadata = {
  title: 'Reels Vihara Bodhi Karuna',
  description: 'Kumpulan video singkat tentang kegiatan, kebersamaan, dan perjalanan Dhamma di Vihara Bodhi Karuna.',
}

export default function ReelsPage() {
  return (
    <main className="reels-page">
      <SiteHeader />
      <section className="reels-content wrap" aria-labelledby="reels-title">
        <div className="reels-heading">
          <div>
            <div className="section-index">CERITA DALAM VIDEO <span>/</span> REELS</div>
            <h1 id="reels-title">Momen untuk <em>dibagikan.</em></h1>
          </div>
          <p>Geser ke atas atau bawah untuk melihat cerita berikutnya.</p>
        </div>
        <ReelsFeed />
      </section>
    </main>
  )
}
