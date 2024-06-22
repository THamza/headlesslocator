import { PrismaClient, Profile } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Haversine formula to calculate the distance between two points on the Earth's surface
const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

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

  return NextResponse.json({ users: usersWithinRadius });
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
