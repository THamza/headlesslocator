import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { JSX, SVGProps } from "react";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section
          className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
          style={{ backgroundImage: "url(/bg.webp)" }}
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
                <p className="text-muted-foreground">
                  Find and connect with Headless Way enthusiasts in your area.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <HandshakeIcon className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-semibold">Collaborate</h3>
                <p className="text-muted-foreground">
                  Work together on projects and share knowledge with your
                  community.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RocketIcon className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-semibold">Grow Together</h3>
                <p className="text-muted-foreground">
                  Learn from each other and grow your skills in The Headless
                  Way.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="community" className="py-12 bg-background">
          <div className="container px-4 mx-auto">
            <h2 className="mb-8 text-3xl font-bold text-center">
              Our Community
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center gap-2 text-center">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">Jane Smith</h3>
                <p className="text-muted-foreground">New York, NY</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>MB</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">Michael Brown</h3>
                <p className="text-muted-foreground">Chicago, IL</p>
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
            &copy; 2024 Headless Community Locator
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

function RocketIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
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
