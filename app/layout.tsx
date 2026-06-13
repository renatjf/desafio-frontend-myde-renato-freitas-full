import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Myde Inbox — Atendimento WhatsApp",
  description: "Painel de atendimento via WhatsApp com IA — Desafio Frontend Renato Freitas",
  openGraph: {
    title: "Myde Inbox — Atendimento WhatsApp",
    description: "Painel de atendimento via WhatsApp com IA",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Myde — Desafio Frontend Renato Freitas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Myde Inbox — Atendimento WhatsApp",
    description: "Painel de atendimento via WhatsApp com IA",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
