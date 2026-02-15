import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ruta de las Fortalezas 2026 | Guía del Corredor",
  description: "Web App no oficial para la XV Ruta de las Fortalezas de Cartagena. Datos oficiales, calculadora de estrategia y asistente IA.",
  keywords: ["Ruta de las Fortalezas", "Cartagena", "Trail Running", "Ultrafondo", "Arde Bogotá"],
  icons: {
    icon: "/logo flownexion 2026.jpeg",
    apple: "/logo flownexion 2026.jpeg",
  },
  openGraph: {
    title: "Ruta de las Fortalezas 2026",
    description: "Guía del Corredor con asistente IA y calculadora de estrategia",
    images: [
      {
        url: "/logo flownexion 2026.jpeg",
        width: 800,
        height: 600,
        alt: "Logo Flownexion",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
