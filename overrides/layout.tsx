import type { Metadata } from "next";
import "./globals.css";
import "./meta-pixel.css";
import MetaPixelConsent from "./components/MetaPixelConsent";

const title = "achaDR para profissionais — Novas consultas, sua decisão";
const description = "Receba novas oportunidades de atendimento online, avalie cada proposta e decida quando e por quanto atender.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.achadr.com.br"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "achaDR",
    title,
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "achaDR para profissionais de saúde. Novas consultas, sua decisão.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/logo-achadr.png",
    shortcut: "/logo-achadr.png",
    apple: "/logo-achadr.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <MetaPixelConsent />
      </body>
    </html>
  );
}
