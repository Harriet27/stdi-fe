import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { sangha } from "@/lib/vihara-data";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { PortraitMedia } from "@/components/portrait-media";

function getInitials(fullName: string): string {
  const cleaned = fullName.replace(/^Bhikkhu\s+/i, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "BK";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function formatValue(val?: string): string {
  if (!val || val.trim() === "" || val.trim() === "-") return "—";
  return val.trim();
}

export function generateStaticParams() {
  return sangha.map((person) => ({
    id: String(person.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);
  const person = sangha.find((item) => item.id === numericId);

  if (!person) {
    return { title: "Profil Sangha" };
  }

  const name = person.upasampada.name;
  const domisiliText =
    person.domisili && person.domisili !== "-" ? ` · ${person.domisili}` : "";

  return {
    title: `${name} | Sangha & Pembimbing`,
    description: `Detail penahbisan Upasampada, Pabbajja, dan domisili ${name}${domisiliText}.`,
  };
}

export default async function SanghaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    notFound();
  }

  const person = sangha.find((item) => item.id === numericId);

  if (!person) {
    notFound();
  }

  const displayName = person.upasampada.name;
  const initials = getInitials(displayName);
  const portraitIndex = ((person.id - 1) % 12) + 1;
  const hasDomisili = Boolean(person.domisili && person.domisili.trim() !== "-");
  const displayImage = person.image ? person.image : null;

  const upasampadaRows = [
    { label: "Nama Penahbisan", value: formatValue(person.upasampada.namePenahbisan) },
    { label: "Tempat Penahbisan", value: formatValue(person.upasampada.tempatPenahbisan) },
    { label: "Tanggal Penahbisan", value: formatValue(person.upasampada.tanggalPenahbisan) },
    { label: "Nama Upajjhaya", value: formatValue(person.upasampada.nameUpajjhaya) },
    {
      label: "Nama Kammavacacariya",
      value: formatValue(person.upasampada.nameKammavacacariya),
    },
  ];

  const pabbajjaRows = [
    { label: "Nama Penahbisan", value: formatValue(person.pabajja.namePenahbisan) },
    { label: "Tempat Penahbisan", value: formatValue(person.pabajja.tempatPenahbisan) },
    { label: "Tanggal Penahbisan", value: formatValue(person.pabajja.tanggalPenahbisan) },
    { label: "Nama Upajjhaya", value: formatValue(person.pabajja.nameUpajjhaya) },
  ];

  return (
    <main className="detail-page">
      <SiteHeader />

      <div
        className="wrap"
        style={{ paddingTop: "2rem", paddingBottom: "0.75rem" }}
      >
        <Link
          href="/sangha"
          className="back-link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.9rem",
          }}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Daftar Sangha</span>
        </Link>
      </div>

      <article
        className="wrap"
        style={{ paddingTop: "1rem", paddingBottom: "4.5rem" }}
      >
        <header style={{ marginBottom: "2.25rem" }}>
          <div className="section-index" style={{ marginBottom: "0.5rem" }}>
            PROFIL BHIKKHU <span>/</span> SANGHA
          </div>
          <h1
            style={{
              fontSize: "clamp(1.85rem, 3.5vw, 2.75rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {displayName}
          </h1>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Left Column */}
          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div
              className={`monk-portrait portrait-${portraitIndex}`}
              style={{
                borderRadius: "16px",
                minHeight: "320px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* <div className="portrait-halo" /> */}
                <PortraitMedia
                  image={person.image}
                  alt={`Portrait of ${displayName}`}
                  initials={initials}
                />
              {/* <span style={{ fontSize: "2.25rem", fontWeight: 600 }}>
                {initials}
              </span>
              <div className="portrait-label">SANGHA · BODHI KARUNA</div> */}
            </div>

            <div
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "12px",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                background: "rgba(255, 255, 255, 0.72)",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                fontSize: "0.875rem",
              }}
            >
              <Sparkles size={16} style={{ flexShrink: 0 }} />
              <span>
                Ditahbiskan{" "}
                <strong>{formatValue(person.upasampada.tanggalPenahbisan)}</strong>
              </span>
            </div>
          </aside>

          {/* Right Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Upasampada Card */}
            <section
              aria-labelledby="upasampada-heading"
              style={{
                padding: "1.5rem 1.75rem",
                borderRadius: "16px",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                background: "#ffffff",
              }}
            >
              <h2
                id="upasampada-heading"
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  opacity: 0.65,
                  marginTop: 0,
                  marginBottom: "1.1rem",
                }}
              >
                Penahbisan Bhikkhu (Upasampada)
              </h2>

              <dl style={{ margin: 0, display: "grid", gap: "0.75rem" }}>
                {upasampadaRows.map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "1rem",
                      paddingBottom: "0.65rem",
                      borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
                      flexWrap: "wrap",
                    }}
                  >
                    <dt style={{ fontSize: "0.9rem", opacity: 0.68, margin: 0 }}>
                      {row.label}
                    </dt>
                    <dd
                      style={{
                        fontSize: "0.925rem",
                        fontWeight: 500,
                        margin: 0,
                        textAlign: "right",
                      }}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Pabbajja Card */}
            <section
              aria-labelledby="pabbajja-heading"
              style={{
                padding: "1.5rem 1.75rem",
                borderRadius: "16px",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                background: "#ffffff",
              }}
            >
              <h2
                id="pabbajja-heading"
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  opacity: 0.65,
                  marginTop: 0,
                  marginBottom: "1.1rem",
                }}
              >
                Penahbisan Samanera (Pabbajja)
              </h2>

              <dl style={{ margin: 0, display: "grid", gap: "0.75rem" }}>
                {pabbajjaRows.map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "1rem",
                      paddingBottom: "0.65rem",
                      borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
                      flexWrap: "wrap",
                    }}
                  >
                    <dt style={{ fontSize: "0.9rem", opacity: 0.68, margin: 0 }}>
                      {row.label}
                    </dt>
                    <dd
                      style={{
                        fontSize: "0.925rem",
                        fontWeight: 500,
                        margin: 0,
                        textAlign: "right",
                      }}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Domisili Card */}
            <section
              aria-labelledby="domisili-heading"
              style={{
                padding: "1.35rem 1.75rem",
                borderRadius: "16px",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                background: "#ffffff",
              }}
            >
              <h2
                id="domisili-heading"
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  opacity: 0.65,
                  marginTop: 0,
                  marginBottom: "0.6rem",
                }}
              >
                Domisili / Alamat
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <MapPin size={16} style={{ opacity: 0.65, flexShrink: 0 }} />
                <span>{hasDomisili ? person.domisili : "—"}</span>
              </p>
            </section>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "0.5rem",
              }}
            >
              <Link
                href="/sangha"
                className="text-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                <span>Lihat pembimbing lainnya</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}