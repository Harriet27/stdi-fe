"use client";

import { useState } from "react";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PortraitMedia } from "@/components/portrait-media";

export type SanghaLevel = "Mahathera" | "Thera" | "Majjhima" | "Navaka";
export type LevelFilter = "Semua" | SanghaLevel;

export interface BhikkhuItem {
  id: number;
  slug?: string;
  image?: string | StaticImageData;
  level: SanghaLevel | string;
  upasampada: {
    name: string;
    namePenahbisan: string;
    tempatPenahbisan: string;
    tanggalPenahbisan: string;
    nameUpajjhaya?: string;
    nameKammavacacariya?: string;
    NameUpajjhaya?: string;
    NameKammavacacariya?: string;
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
  items: BhikkhuItem[];
}

const ITEMS_PER_PAGE = 12;
const LEVEL_ORDER: SanghaLevel[] = ["Mahathera", "Thera", "Majjhima", "Navaka"];

function getInitials(fullName: string): string {
  const cleaned = fullName.replace(/^Bhikkhu\s+/i, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "BK";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function SanghaDirectory({ items }: SanghaDirectoryProps) {
  const [selectedLevel, setSelectedLevel] = useState<LevelFilter>("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  // Count entries per level in pure JS
  const levelCounts = LEVEL_ORDER.reduce<Record<SanghaLevel, number>>(
    (acc, lvl) => {
      acc[lvl] = items.filter((item) => item.level === lvl).length;
      return acc;
    },
    { Mahathera: 0, Thera: 0, Majjhima: 0, Navaka: 0 }
  );

  // Filter items before paginating
  const filteredItems =
    selectedLevel === "Semua"
      ? items
      : items.filter((item) => item.level === selectedLevel);

  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSelectLevel = (level: LevelFilter) => {
    setSelectedLevel(level);
    setCurrentPage(1);
  };

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

      {/* Pill Level Filter Bar */}
      <div
        role="group"
        aria-label="Filter tingkat Sangha"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.65rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        {(["Semua", ...LEVEL_ORDER] as LevelFilter[]).map((level) => {
          const isActive = selectedLevel === level;
          const count = level === "Semua" ? null : levelCounts[level];

          return (
            <button
              key={level}
              type="button"
              onClick={() => handleSelectLevel(level)}
              aria-pressed={isActive}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.5rem 1.5rem",
                borderRadius: "9999px",
                border: isActive
                  ? "1px solid #043b3b"
                  : "1px solid #e2e8f0",
                backgroundColor: isActive ? "#043b3b" : "#ffffff",
                color: isActive ? "#ffffff" : "#1e3a5f",
                fontWeight: 700,
                fontSize: "0.95rem",
                lineHeight: 1.2,
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
            >
              <span>{level}</span>
              {count !== null && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "1.25rem",
                    height: "1.25rem",
                    padding: "0 0.4rem",
                    borderRadius: "9999px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    backgroundColor: isActive
                      ? "rgba(255, 255, 255, 0.18)"
                      : "#eef2f6",
                    color: isActive ? "#ffffff" : "#334155",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="sangha-grid">
        {currentItems.map((person, i) => {
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
              href={`/sangha/${person.id}`}
              className="sangha-card"
              key={person.id}
            >
              <div className={`monk-portrait portrait-${portraitIndex}`}>
                <PortraitMedia
                  image={person.image}
                  alt={`Portrait of ${displayName}`}
                  initials={initials}
                />
              </div>
              <div className="monk-info">
                <span>
                  {hasDomisili ? person.domisili : "Vihāra Indonesia"}
                </span>
                <h3>{displayName}</h3>
                <p>
                  {person.level} · {upasampadaDate}
                </p>
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
            onClick={() => handlePageChange(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
            style={{
              padding: "0.5rem 1rem",
              cursor: safeCurrentPage === 1 ? "not-allowed" : "pointer",
              opacity: safeCurrentPage === 1 ? 0.5 : 1,
            }}
          >
            Sebelumnya
          </button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => handleSelectOrGoToPage(handlePageChange, page)}
                aria-current={page === safeCurrentPage ? "page" : undefined}
                style={{
                  padding: "0.5rem 0.85rem",
                  fontWeight: page === safeCurrentPage ? 700 : 400,
                  cursor: "pointer",
                  textDecoration: page === safeCurrentPage ? "underline" : "none",
                }}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => handlePageChange(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages}
            style={{
              padding: "0.5rem 1rem",
              cursor: safeCurrentPage === totalPages ? "not-allowed" : "pointer",
              opacity: safeCurrentPage === totalPages ? 0.5 : 1,
            }}
          >
            Berikutnya
          </button>
        </nav>
      )}
    </section>
  );
}

function handleSelectOrGoToPage(
  onPageChange: (page: number) => void,
  page: number
) {
  onPageChange(page);
}