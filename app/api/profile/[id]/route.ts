import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const data = await request.json();

  const { error, ...cleanedData } = data;

  const profile = await prisma.profile.upsert({
    where: { clerkId: user.id },
    update: cleanedData,
    create: {
      ...cleanedData,
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return NextResponse.json(profile);
}
