import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { latitude, longitude, radius } = await request.json();

  const radiusInDegrees = radius / 111; // approximate conversion for latitude degrees
  const users = await prisma.profile.findMany({
    where: {
      AND: [
        {
          latitude: {
            gte: latitude - radiusInDegrees,
            lte: latitude + radiusInDegrees,
          },
        },
        {
          longitude: {
            gte:
              longitude -
              radiusInDegrees / Math.cos(latitude * (Math.PI / 180)),
            lte:
              longitude +
              radiusInDegrees / Math.cos(latitude * (Math.PI / 180)),
          },
        },
      ],
    },
  });

  return NextResponse.json({ users });
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
