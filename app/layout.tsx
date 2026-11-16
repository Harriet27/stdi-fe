import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vihara Bodhi Karuna — Ruang untuk Bertumbuh",
    template: "%s | Vihara Bodhi Karuna",
  },
  description:
    "Vihara Bodhi Karuna adalah ruang terbuka untuk belajar Dhamma, berlatih meditasi, dan menumbuhkan kebajikan bersama.",
  generator: "v0.app",
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f8f7f2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
