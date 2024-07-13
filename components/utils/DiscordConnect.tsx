import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, Loader2, Unplug } from "lucide-react";
import { toast } from "../ui/use-toast";

type DiscordConnectProps = {
  email: string;
  discordId: string;
  onDisconnect: () => void;
  onConnect: () => void;
};

export default function DiscordConnect({
  email,
  discordId,
  onDisconnect,
  onConnect,
}: DiscordConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleDiscordConnect = () => {
    setIsConnecting(true);
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      console.error("Environment variables for Discord OAuth are not set");
      return;
    }

    const state = email; // Pass user's email as state
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=identify&state=${encodeURIComponent(state)}`;
  };

  const handleDiscordDisconnect = async () => {
    setIsDisconnecting(true);
    const res = await fetch(`/api/discord/disconnect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      onDisconnect();
      toast({
        title: "Discord disconnected",
        description: "Your Discord account has been disconnected successfully.",
      });
    } else {
      toast({
        title: "Discord disconnect failed",
        description: "There was an error disconnecting your Discord account.",
        variant: "destructive",
      });
    }

    setIsDisconnecting(false);
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      {discordId ? (
        <Button
          variant="destructive"
          onClick={handleDiscordDisconnect}
          disabled={isDisconnecting}
        >
          {isDisconnecting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Unplug size={20} className="mr-2" />
              Disconnect Discord
            </>
          )}
        </Button>
      ) : (
        <>
          <p className="text-gray-500">
            Step 1: Join our Discord server using the link below:
          </p>
          <a
            href="https://discord.gg/nNmDFVQTHP"
            target="_blank"
            className="flex items-center gap-2 font-medium text-[0.8125rem] rounded-full px-3 py-2 hover:bg-gray-100 justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_29_46781)">
                <path
                  d="M13.5447 2.91319C12.5073 2.43704 11.4126 2.09749 10.2879 1.90306C10.2777 1.90115 10.2672 1.90252 10.2578 1.90696C10.2484 1.9114 10.2406 1.91869 10.2356 1.92779C10.0949 2.17799 9.93913 2.50433 9.83007 2.76079C8.60027 2.57666 7.37673 2.57666 6.1722 2.76079C6.06313 2.49859 5.90167 2.17799 5.7604 1.92779C5.75517 1.9189 5.74738 1.91178 5.73804 1.90738C5.7287 1.90298 5.71826 1.9015 5.70807 1.90313C4.58326 2.0971 3.48846 2.43662 2.45127 2.91313C2.4424 2.91692 2.43492 2.92337 2.42987 2.93159C0.355603 6.03053 -0.212664 9.05326 0.066136 12.0385C0.0669243 12.0458 0.0691714 12.0529 0.0727443 12.0593C0.0763171 12.0658 0.081143 12.0714 0.086936 12.0759C1.45547 13.081 2.78114 13.6911 4.0822 14.0955C4.09232 14.0985 4.10312 14.0984 4.11315 14.0951C4.12318 14.0918 4.13197 14.0856 4.13833 14.0771C4.44607 13.6569 4.7204 13.2137 4.95567 12.7477C4.9589 12.7413 4.96075 12.7343 4.96108 12.7271C4.96142 12.72 4.96024 12.7129 4.95762 12.7062C4.955 12.6995 4.951 12.6935 4.94588 12.6885C4.94077 12.6835 4.93465 12.6797 4.92793 12.6772C4.49273 12.5121 4.0784 12.3109 3.6798 12.0823C3.67253 12.0781 3.66643 12.0721 3.66202 12.0649C3.65762 12.0577 3.65506 12.0495 3.65455 12.0411C3.65405 12.0327 3.65563 12.0243 3.65915 12.0166C3.66267 12.009 3.66802 12.0023 3.67474 11.9972C3.7586 11.9343 3.84254 11.869 3.9226 11.8029C3.92972 11.7971 3.93833 11.7933 3.94747 11.7921C3.95661 11.7908 3.96592 11.7922 3.97433 11.7959C6.59287 12.9915 9.42767 12.9915 12.0153 11.7959C12.0237 11.7919 12.0331 11.7904 12.0424 11.7915C12.0516 11.7926 12.0604 11.7964 12.0676 11.8023C12.1477 11.8683 12.2316 11.9343 12.3161 11.9972C12.3229 12.0022 12.3282 12.0089 12.3318 12.0165C12.3354 12.0241 12.337 12.0325 12.3366 12.0409C12.3361 12.0493 12.3337 12.0575 12.3293 12.0647C12.325 12.0719 12.3189 12.0779 12.3117 12.0823C11.913 12.3152 11.4953 12.514 11.0631 12.6765C11.0564 12.6791 11.0503 12.683 11.0452 12.6881C11.0401 12.6932 11.0362 12.6993 11.0336 12.706C11.031 12.7127 11.0299 12.7199 11.0303 12.7271C11.0307 12.7343 11.0326 12.7413 11.0359 12.7477C11.2762 13.213 11.5505 13.6562 11.8526 14.0765C11.8588 14.0851 11.8675 14.0916 11.8776 14.0951C11.8877 14.0985 11.8986 14.0986 11.9087 14.0955C13.2161 13.6911 14.5417 13.0809 15.9103 12.0759C15.9162 12.0716 15.9211 12.0661 15.9247 12.0598C15.9283 12.0534 15.9305 12.0464 15.9311 12.0391C16.2647 8.58779 15.3723 5.58986 13.5655 2.93219ZM5.34667 10.2208C4.55834 10.2208 3.90874 9.49699 3.90874 8.60813C3.90874 7.71933 4.54573 6.99553 5.34673 6.99553C6.15393 6.99553 6.7972 7.72566 6.7846 8.60819C6.7846 9.49699 6.1476 10.2208 5.34667 10.2208ZM10.6632 10.2208C9.87487 10.2208 9.22527 9.49699 9.22527 8.60813C9.22527 7.71933 9.8622 6.99553 10.6632 6.99553C11.4704 6.99553 12.1137 7.72566 12.1011 8.60819C12.1011 9.49699 11.4704 10.2208 10.6632 10.2208Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_29_46781">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Join our discord server
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="2" width="12" height="12" rx="3" fill="#EEEEF0" />
              <path
                d="M5.75 10.25L10.25 5.75M10.25 5.75H6.75M10.25 5.75V9.25"
                stroke="#9394A1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <p className="text-gray-500">
            Step 2: Connect your Discord account after joining the server
          </p>
          <Button
            onClick={handleDiscordConnect}
            disabled={isConnecting}
            className="rounded-lg bg-gradient-to-r from-[#6E7EC4] to-blue-500 text-white text-sm font-semibold transition-transform transform hover:scale-105 shadow-lg"
          >
            {isConnecting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Link size={20} className="mr-2" />
                Connect Discord Account
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
}
