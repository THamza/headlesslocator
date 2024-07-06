import {
  Client,
  GatewayIntentBits,
  ChannelType,
  GuildTextBasedChannel,
} from "discord.js";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { haversineDistance, getNearestCity } from "@/lib/utils";

const prisma = new PrismaClient();
const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

discordClient.login(process.env.DISCORD_BOT_TOKEN);

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

  // Handle Discord channel creation and user invitations
  if (isLocationUpdated && cleanedData.discord) {
    const nearestCity = await getNearestCity(
      cleanedData.latitude,
      cleanedData.longitude
    );

    console.log("Nearest city:", nearestCity);
    console.log("DISCORD_GUILD_ID:", process.env.DISCORD_GUILD_ID);
    console.log("DISCORD_CATEGORY_ID:", process.env.DISCORD_CATEGORY_ID);

    let cityGroup = await prisma.cityGroup.findUnique({
      where: { city: nearestCity },
    });

    if (!cityGroup) {
      if (!process.env.DISCORD_GUILD_ID || !process.env.DISCORD_CATEGORY_ID) {
        return NextResponse.json(
          { error: "Discord environment variables not set" },
          { status: 500 }
        );
      }

      const guild = await discordClient.guilds.fetch(
        process.env.DISCORD_GUILD_ID
      );
      const channel = await guild.channels.create({
        name: nearestCity,
        type: ChannelType.GuildText,
        parent: process.env.DISCORD_CATEGORY_ID,
      });

      cityGroup = await prisma.cityGroup.create({
        data: {
          city: nearestCity,
          groupId: channel.id,
        },
      });
    }

    const guild = await discordClient.guilds.fetch(
      process.env.DISCORD_GUILD_ID || "1259076591900692490"
    );
    const member = await guild.members.fetch(cleanedData.discord);
    const channel = (await guild.channels.fetch(
      cityGroup.groupId
    )) as GuildTextBasedChannel;

    if (channel.isTextBased()) {
      await channel.send(`Welcome ${member.user.username} to ${nearestCity}!`);
    }
  }

  return NextResponse.json(profile);
}
