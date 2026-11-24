"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface BhikkhuItem {
  slug: string;
  upasampada: {
    name: string;
    namePenahbisan: string;
    tempatPenahbisan: string;
    tanggalPenahbisan: string;
    NameUpajjhaya: string;
    NameKammavacacariya: string;
  };
  pabajja: {
    namePenahbisan: string;
    tempatPenahbisan: string;
    tanggalPenahbisan: string;
    nameUpajjhaya: string;
  };
  domisili: string;
}

interface SanghaDirectoryProps {
  // items: BhikkhuItem[];
  items: any[]; // Use 'any' type for now to avoid type errors
}

const ITEMS_PER_PAGE = 12;

function getInitials(fullName: string): string {
  // Strip "Bhikkhu" prefix if present so initials reflect their monastic name
  const cleaned = fullName.replace(/^Bhikkhu\s+/i, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "BK";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function SanghaDirectory({ items }: SanghaDirectoryProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // Pure JS slice for current page (max 12 items)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    document
      .getElementById("sangha-directory-top")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="sangha-directory-top"
      className="sangha-section wrap sangha-directory"
    >
      <div className="section-heading">
        <div>
          <div className="section-index">
            BODHI KARUNA <span>/</span> PEMBIMBING
          </div>
          <h2>
            Berkenalan lebih <em>dekat.</em>
          </h2>
        </div>
        <p className="heading-note">
          Pilih profil untuk mengenal
          <br />
          perjalanan dan bimbingannya.
        </p>
      </div>

      <div className="sangha-grid">
        {currentItems.map((person, i) => {
          // Keeps portrait classes cycling cleanly (1..12) across all pages
          const portraitIndex = (i % ITEMS_PER_PAGE) + 1;
          const displayName = person.upasampada.name;
          const initials = getInitials(displayName);
          const hasDomisili = person.domisili && person.domisili !== "-";
          const upasampadaDate =
            person.upasampada.tanggalPenahbisan !== "-"
              ? `Upasampada: ${person.upasampada.tanggalPenahbisan}`
              : "Sangha Theravāda";

          return (
            <Link
              href={`/sangha/${person.slug}`}
              className="sangha-card"
              key={`${person.slug}-${startIndex + i}`}
            >
              <div className={`monk-portrait portrait-${portraitIndex}`}>
                <div className="portrait-halo" />
                <span>{initials}</span>
                <div className="portrait-label">SANGHA · BODHI KARUNA</div>
              </div>
              <div className="monk-info">
                <span>
                  {hasDomisili ? person.domisili : "Vihāra Indonesia"}
                </span>
                <h3>{displayName}</h3>
                <p>{upasampadaDate}</p>
                <ArrowUpRight size={17} />
              </div>
              <p className="sangha-card-bio">
                {person.upasampada.tempatPenahbisan !== "-"
                  ? `Penahbisan di ${person.upasampada.tempatPenahbisan}`
                  : "Anggota Sangha pembimbing Dhamma."}
              </p>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Navigasi halaman Sangha"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "3rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "0.5rem 1rem",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            Sebelumnya
          </button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
                style={{
                  padding: "0.5rem 0.85rem",
                  fontWeight: page === currentPage ? 700 : 400,
                  cursor: "pointer",
                  textDecoration: page === currentPage ? "underline" : "none",
                }}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "0.5rem 1rem",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            Berikutnya
          </button>
        </nav>
      )}
    </section>
  );
}