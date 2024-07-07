"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { Roboto } from "next/font/google";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});

export default function Header() {
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center">
        <Dialog open={showSignInDialog} onOpenChange={setShowSignInDialog}>
          <DialogContent className="bg-transparent border-none">
            <SignIn />
          </DialogContent>
        </Dialog>
        <Link href="https://headless.org/" prefetch={false} target="_blank">
          <Image
            src="/theheadlessway.png"
            alt="Community Locator"
            width={35}
            height={35}
          />
        </Link>
        <div className="text-lg mr-12 ml-3">
          <Link href="/">
            <p style={{ fontFamily: roboto.style.fontFamily }}>
              Community Locator
            </p>
          </Link>
        </div>
        <SignedIn>
          <NavigationMenu className="text-muted-foreground">
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/profile">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-semibold transition-transform transform hover:scale-105 shadow-lg">
                      Profile
                    </button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/map">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-semibold transition-transform transform hover:scale-105 shadow-lg">
                      Community
                    </button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </SignedIn>
      </div>
      <div className="flex items-center gap-4">
        <SignedIn>
          <Link href="https://discord.gg/SBqhXqUC" target="_blank">
            <button className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#6E7EC4] to-blue-500 text-white text-sm font-semibold transition-transform transform hover:scale-105 shadow-lg">
              <Image
                src="/discordLogo.svg"
                alt="Discord Logo"
                width={20}
                height={20}
                className="mr-2"
              />
              Join Discord
            </button>
          </Link>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        <SignedOut>
          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-semibold transition-transform transform hover:scale-105 shadow-lg"
              onClick={() => setShowSignInDialog(true)}
            >
              Login
            </button>
            <SignUpButton>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-semibold transition-transform transform hover:scale-105 shadow-lg">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </header>
  );
}
