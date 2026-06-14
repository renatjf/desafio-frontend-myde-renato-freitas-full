import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./globals.css";

export const metadata = {
  title: "Inbox WhatsApp — MyDE Atendimento",
  description:
    "Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos.",
  metadataBase: new URL("https://desafio-frontend-myde-full.netlify.app"),
  openGraph: {
    title: "Inbox WhatsApp — MyDE Atendimento",
    description:
      "Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos.",
    url: "/",
    siteName: "MyDE Inbox",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inbox WhatsApp — MyDE Atendimento",
    description:
      "Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos.",
    images: ["/og-image.jpg"],
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
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
