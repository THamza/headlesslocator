import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { haversineDistance } from "@/lib/utils";
import { NewUserNearbyTemplate } from "@/components/emailTemplates/newUserNearbyTemplate";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_EMAIL_SERVICE_KEY);

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

  const existingProfile = await prisma.profile.findUnique({
    where: { clerkId: user.id },
  });

  // Check if location is updated
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

  // Notify nearby users if location is updated
  if (isLocationUpdated) {
    // Fetch all users who need to be notified and have valid coordinates
    const nearbyUsers = await prisma.profile.findMany({
      where: {
        notify: true,
        latitude: { not: null },
        longitude: { not: null },
        notificationRadius: { not: null },
        NOT: {
          clerkId: user.id,
        },
      },
    });

    // Use Promise.all to send emails in parallel
    await Promise.all(
      nearbyUsers.map(async (nearbyUser) => {
        const distance = haversineDistance(
          cleanedData.latitude,
          cleanedData.longitude,
          nearbyUser.latitude!,
          nearbyUser.longitude!
        );

        if (distance <= nearbyUser.notificationRadius!) {
          const plainTextContent = `Hello, ${nearbyUser.firstName}!\n\nA new user has joined within your notification radius. Here are their details:\n\nName: ${cleanedData.firstName} ${cleanedData.lastName}\nEmail: ${cleanedData.email}\nUsername: ${cleanedData.telegram}\nInterests: ${cleanedData.interests}\n\nFeel free to reach out and connect with them.\n\nBest regards,\nHeadless CL Team`;

          await resend.emails.send({
            from: "Headless CL <headless-community-locator@resend.dev>",
            to: [nearbyUser.email],
            subject: "New User Nearby",
            text: plainTextContent,
            react: NewUserNearbyTemplate({
              firstName: nearbyUser.firstName || "Unknown",
              newUser: {
                name: `${cleanedData.firstName} ${cleanedData.lastName}`,
                email: cleanedData.email,
                username: cleanedData.telegram,
                interests: cleanedData.interests,
              },
            }),
          });
        }
      })
    );
  }

  return NextResponse.json(profile);
}
