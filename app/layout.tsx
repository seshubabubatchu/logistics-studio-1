import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const body = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Logistics Studio | Supply Chain Innovation & Solutions", template: "%s | Logistics Studio" },
  description:
    "Logistics Studio provides digital strategy and solutions for the transportation & logistics industry: software, data science, dedicated teams and integrations.",
};
export const viewport: Viewport = { themeColor: "#05080f", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <Loader />
        <Shell>{children}</Shell>
        <Footer />
      </body>
    </html>
  );
}
