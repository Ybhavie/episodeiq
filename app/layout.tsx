import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "EpisodeIQ — Every confused kid deserves a real answer",
  description: "AI-powered personalised lessons for kids aged 9–12. Ask any question and get a clear, real explanation with visuals and a quiz — in their own language.",
  keywords: ["kids learning", "AI education", "personalised learning", "homework help"],
  openGraph: {
    title: "EpisodeIQ",
    description: "Every confused kid deserves a real answer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="bg-page-bg text-text-main antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}