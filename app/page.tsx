"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { JSX, SVGProps, useState } from "react";
import Header from "@/components/Header";

const BG_IMAGES = [
  "bg.jpeg",
  "bg2.webp",
  "bg3.webp",
  "bg4.webp",
  "bg5.jpg",
  "bg6.jpg",
  "bg7.webp",
];

export default function Home() {
  const [bgIndex, setBgIndex] = useState(0);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Button
        onClick={() => {
          setBgIndex((bgIndex + 1) % BG_IMAGES.length);
        }}
      >
        Change Background ({bgIndex + 1}/{BG_IMAGES.length})
      </Button>
      <main className="flex-1">
        <section
          className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(/${BG_IMAGES[bgIndex]})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-8 bg-black/60 shadow-lg flex flex-col items-center justify-center gap-6 text-center text-white rounded-2xl">
            {" "}
            <h1 className="text-4xl font-bold md:text-6xl">
              Connect with Headless Way Enthusiasts
            </h1>
            <p className="max-w-lg text-lg md:text-xl font-medium text-gray-300">
              Join a community of like-minded individuals exploring <br /> The
              Headless Way
            </p>
            <SignedIn>
              <div className="flex gap-4">
                <Link
                  href="/profile"
                  className="px-4 py-2 rounded-full font-semibold bg-white text-black hover:bg-gray-200"
                >
                  Profile
                </Link>
                <Link
                  href="/map"
                  className="px-4 py-2 rounded-full font-semibold bg-white text-black hover:bg-gray-200"
                >
                  Community
                </Link>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </section>

        <section id="features" className="py-12 bg-muted">
          <div className="container px-4 mx-auto">
            {/* <h2 className="mb-8 text-3xl font-bold text-center">Features</h2> */}
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center gap-2 text-center">
                <UsersIcon className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-semibold">Connect Locally</h3>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <HandshakeIcon className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-semibold">
                  Find Headless Friends While Traveling
                </h3>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <EyeIcon className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-semibold">
                  Share the One Seeing with Many Voices
                </h3>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-between px-4 py-2 bg-muted">
        <nav>
          <Link href="#" className="mr-4 hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
        </nav>
        <div>
          <p className="text-sm text-muted-foreground">
            <a href="https://www.thamza.com" target="_blank">
              &copy;
            </a>{" "}
            2024 Headless Community Locator
          </p>
        </div>
      </footer>
    </div>
  );
}

function HandshakeIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
}

function NetworkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}

function EyeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12s-4-8-10-8S2 12 2 12s4 8 10 8 10-8 10-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
