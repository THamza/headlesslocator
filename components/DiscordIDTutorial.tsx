import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Badge } from "./ui/badge";

export function DiscordIDTutorial() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (
    open: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsOpen(open);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Badge style={{ cursor: "pointer" }}>?</Badge>
      </SheetTrigger>
      <SheetContent className="scrollableSheet">
        <SheetHeader>
          <SheetTitle>Discord Tutorial</SheetTitle>
          <SheetDescription>
            How can I view or edit my Discord ID?
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <a
            href="https://discord.gg/SBqhXqUC"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full">Join us on Discord</Button>
          </a>
          <p>
            Step 1. In your Discord app, click on the user icon in the bottom
            left corner
          </p>
          <p>Step 2. Click on "Copy User ID"</p>
          <Image
            src="/discordIDStep1.png"
            alt="Discord ID"
            width={300}
            height={400}
          />
          <p className="text-center text-5xl mt-4">🎉</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
