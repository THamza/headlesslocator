import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Ensure the email is provided
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Update the profile to remove the Discord ID
    const profile = await prisma.profile.update({
      where: { email },
      data: { discord: "" },
    });

    // Return the updated profile
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error disconnecting Discord:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
