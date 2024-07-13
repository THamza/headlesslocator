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
import { Badge } from "../ui/badge";

export function TelegramUsernameTutorial() {
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
          <SheetTitle>Telegram Tutorial</SheetTitle>
          <SheetDescription>
            How can I view or edit my Telegram username?
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <p>
            Step 1. In your Telegram app, click on the menu icon then settings
          </p>
          <Image
            src="/telegramUsernameStep1.jpg"
            alt="Telegram Settings"
            width={300}
            height={400}
          />
          <p>
            Step 2. In the "Account" sections, you will find "Username" where
            you will be able to set/update your telegram username
          </p>
          <Image
            src="/telegramUsernameStep2.jpg"
            alt="Telegram Username"
            width={300}
            height={400}
          />
          <p className="text-center text-5xl mt-4">🎉</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
