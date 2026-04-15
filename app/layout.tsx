import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yomomma.io"),
  title: "yomomma.io",
  description: "A fast yo momma joke generator with a REST API and frontend built for Vercel.",
  openGraph: {
    title: "yomomma.io",
    description: "Generate random yo momma jokes or browse them by category.",
    url: "https://yomomma.io",
    siteName: "yomomma.io",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "yomomma.io",
    description: "Generate random yo momma jokes or browse them by category.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
