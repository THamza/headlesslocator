import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Script from "next/script";
import { Metadata } from "next";
import localFont from "next/font/local";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { PHProvider } from "./providers/posthog/PHProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theheadlessway.org/"),
  title: "Headless Friend Finder",
  description:
    "A Simple Headless Community Finder App built with Next.js, Clerk, and Leaflet allowing users to view and share their location with others.",
  openGraph: { images: ["/og.png"] },
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#000000" },
        elements: {
          formButtonPrimary:
            "bg-black border border-black border-solid hover:bg-white hover:text-black",
          socialButtonsBlockButton:
            "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
          socialButtonsBlockButtonText: "font-semibold",
          formButtonReset:
            "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
          membersPageInviteButton:
            "bg-black border border-black border-solid hover:bg-white hover:text-black",
          card: "bg-[#fafafa]",
        },
      }}
    >
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <PHProvider>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            {children}
            <Toaster />
          </body>

          <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
          <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
        </PHProvider>
      </html>
    </ClerkProvider>
  );
}
