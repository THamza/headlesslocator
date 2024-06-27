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
    <header className="flex items-center justify-between bg-primary px-4 py-3 shadow-sm bg-white">
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
        <div className="text-lg  mr-12 ml-3">
          <Link href="/">
            <p style={{ fontFamily: roboto.style.fontFamily }}>
              Community Locator
            </p>
          </Link>
        </div>
        <SignedIn>
          <NavigationMenu className="text-muted-foreground">
            <NavigationMenuList>
              <NavigationMenuItem className="mr-8">
                <NavigationMenuLink asChild>
                  <Link href="/profile">Profile</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/map">Community</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </SignedIn>
      </div>
      <div>
        <div>
          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-4">
              {/* <SignInButton> */}
              <button
                className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
                onClick={() => setShowSignInDialog(true)}
              >
                Login
              </button>
              {/* </SignInButton> */}
              <SignUpButton>
                <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
