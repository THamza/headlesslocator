import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { JSX, SVGProps } from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-primary px-4 py-3 shadow-sm">
      <div className="flex items-center gap-8">
        {/* open in a new tab */}
        <Link href="https://headless.org/" prefetch={false} target="_blank">
          <Image
            src="/theheadlessway.png"
            alt="Community Locator"
            width={60}
            height={60}
          />
        </Link>
        <div className="text-lg font-semibold text-primary-foreground mr-8">
          <Link href="/">Community Locator</Link>
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
              <SignInButton>
                <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                  Login
                </button>
              </SignInButton>
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
