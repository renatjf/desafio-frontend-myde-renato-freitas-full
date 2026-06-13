import Provider from "@/providers/ReactQueryProvider";
import "./globals.css";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <head>
        <title>Inbox WhatsApp — MyDE Atendimento</title>
        <meta
          name="description"
          content="Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Inbox WhatsApp — MyDE Atendimento" />
        <meta
          property="og:description"
          content="Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="/" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Inbox WhatsApp — MyDE Atendimento"
        />
        <meta
          name="twitter:description"
          content="Interface de atendimento via WhatsApp — visualize conversas, envie respostas e gerencie atendimentos."
        />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MyDE Inbox",
              url: "/",
              description:
                "Interface de atendimento via WhatsApp para gerenciamento de conversas.",
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Provider>
          <div suppressHydrationWarning>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
