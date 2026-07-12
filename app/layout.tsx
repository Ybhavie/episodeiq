import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "EpisodeIQ — Every confused kid deserves their own episode",
  description: "AI-powered personalised animated video lessons for kids aged 9–12. Learn anything through your own story universe.",
  keywords: ["kids learning", "AI education", "animated lessons", "personalised learning"],
  openGraph: {
    title: "EpisodeIQ",
    description: "Every confused kid deserves their own episode",
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