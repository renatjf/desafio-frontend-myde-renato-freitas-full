import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://desafio-front-myde-next.netlify.app";

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  title: "Inbox WhatsApp — MyDE Atendimento",
  description:
    "Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Inbox WhatsApp — MyDE Atendimento",
    description:
      "Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos.",
    url: SITE_URL,
    siteName: "MyDE Inbox",
    type: "website",
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: "MyDE Atendimento" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inbox WhatsApp — MyDE Atendimento",
    description:
      "Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
