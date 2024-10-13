import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Symbiotic Landscape Generator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900">{children}</body>
    </html>
  );
}
