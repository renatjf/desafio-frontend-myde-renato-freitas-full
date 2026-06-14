import type { Metadata } from "next";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./globals.css";

const SITE_URL = "https://desafio-frontend-myde-full.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Inbox WhatsApp — MyDE Atendimento",
    template: "%s | MyDE Inbox",
  },

  description:
    "Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos.",

  openGraph: {
    title: "Inbox WhatsApp — MyDE Atendimento",
    description:
      "Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos.",
    url: SITE_URL,
    siteName: "MyDE Inbox",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Preview do sistema de atendimento MyDE",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Inbox WhatsApp — MyDE Atendimento",
    description:
      "Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos.",
    images: [`${SITE_URL}/og-image.jpg`],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
