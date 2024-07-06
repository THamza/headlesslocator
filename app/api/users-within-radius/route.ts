import { haversineDistance } from "@/lib/utils";
import { PrismaClient, Profile } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { latitude, longitude, radius } = await request.json();

  const allUsers = await prisma.profile.findMany();

  // Filter users within the radius using the Haversine formula
  const usersWithinRadius = allUsers.filter((user: Profile) => {
    const distance = haversineDistance(
      latitude,
      longitude,
      user.latitude!,
      user.longitude!
    );
    return distance <= radius;
  });

  const cleanedUsers = usersWithinRadius.map((user) => {
    const {
      firstName,
      lastName,
      email,
      telegram,
      latitude,
      longitude,
      interests,
      country,
      city,
      state,
    } = user;
    return {
      firstName,
      lastName,
      email,
      telegram,
      latitude,
      longitude,
      interests,
      country,
      city,
      state,
    };
  });

  return NextResponse.json({ users: cleanedUsers });
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
