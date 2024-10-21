import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instant Wisdom NOW",
  description: "We got you cover with up to +20 Wisdom",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      <body>{children}</body>
    </html>
  );
}
