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
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { MessageCircleMore } from "lucide-react";

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
            alt="Friend Finder"
            width={35}
            height={35}
          />
        </Link>
        <div className="text-lg mr-12 ml-3">
          <Link href="/">
            <p style={{ fontFamily: roboto.style.fontFamily }}>Friend Finder</p>
          </Link>
        </div>
        <SignedIn>
          <NavigationMenu className="text-muted-foreground">
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/profile">
                    <button className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white text-sm font-medium transition-transform transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 shadow-md">
                      Profile
                    </button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/map">
                    <button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 text-white text-sm font-medium transition-transform transform hover:scale-105 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 shadow-md">
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-transform transform hover:scale-105 mr-4"
              >
                <MessageCircleMore size={20} className="mr-2" />
                Join Community Chatrooms
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    Join the Community Chatrooms
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with fellow members of The Headless Way community in
                    our local and global chatrooms. Share your experiences, ask
                    questions, and become part of a supportive network.
                  </p>
                </div>
                <Link href="https://discord.gg/nNmDFVQTHP" target="_blank">
                  <Button className="flex items-center w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#6E7EC4] to-blue-500 text-white text-sm font-semibold transition-transform transform hover:scale-105 shadow-lg">
                    <Image
                      src="/discordLogo.svg"
                      alt="Discord Logo"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Join us on Discord
                  </Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
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
