import { handleDiscordChannelAssignment } from "@/app/utils/discord";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

const prisma = new PrismaClient();

type DiscordTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

type DiscordUserInfoResponse = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") as string;
  const state = searchParams.get("state") as string;
  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;

  // Log environment variables for debugging
  console.log("clientId:", clientId);
  console.log("clientSecret:", clientSecret);
  console.log("redirectUri:", redirectUri);

  if (!clientId || !clientSecret || !redirectUri) {
    console.error("Discord environment variables are not set");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const data = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    scope: "identify",
  };

  try {
    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data as any),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error fetching tokens:", error);
      return NextResponse.json(
        { error: "Error fetching tokens" },
        { status: response.status }
      );
    }

    const tokens: DiscordTokenResponse =
      (await response.json()) as DiscordTokenResponse;

    console.log("Tokens received:", tokens);

    const userInfoResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      const error = await userInfoResponse.json();
      console.error("Error fetching user info:", error);
      return NextResponse.json(
        { error: "Error fetching user info" },
        { status: userInfoResponse.status }
      );
    }

    const userInfo: DiscordUserInfoResponse =
      (await userInfoResponse.json()) as DiscordUserInfoResponse;

    console.log("User Info received:", userInfo);

    const profile = await prisma.profile.update({
      where: { email: state },
      data: {
        discord: userInfo.id,
      },
    });

    console.log("Profile updated:", profile);

    const isLocationSet = profile.latitude && profile.longitude;

    if (isLocationSet && userInfo.id) {
      await handleDiscordChannelAssignment({
        latitude: profile.latitude as number,
        longitude: profile.longitude as number,
        discord: userInfo.id,
      });
    }
    console.log("Profile Discord channel assigned");

    return NextResponse.redirect(
      process.env.NEXT_PUBLIC_APP_DOMAIN + "/profile"
    );
  } catch (error) {
    console.error("OAuth2 Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
