import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { handleDiscordChannelAssignment } from "@/app/utils/discord";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const data = await request.json();
    const { error, ...cleanedData } = data;

    const existingProfile = await prisma.profile.findUnique({
      where: { clerkId: user.id },
    });

    const isLocationSet = cleanedData.latitude && cleanedData.longitude;

    const isLocationUpdated = existingProfile
      ? existingProfile.latitude !== cleanedData.latitude ||
        existingProfile.longitude !== cleanedData.longitude
      : true;

    const profile = await prisma.profile.upsert({
      where: { clerkId: user.id },
      update: cleanedData,
      create: {
        ...cleanedData,
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    if (isLocationSet && isLocationUpdated && cleanedData.discord) {
      await handleDiscordChannelAssignment(cleanedData);
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
