import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { haversineDistance, getNearestCity } from "@/lib/utils";

const prisma = new PrismaClient();

let discordClient: any = null;

async function getDiscordClient() {
  if (discordClient) return discordClient;

  const { Client, GatewayIntentBits, ChannelType } = await import("discord.js");

  discordClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
    ],
  });

  try {
    await discordClient.login(process.env.DISCORD_BOT_TOKEN);
    // console.log(`Logged in as ${discordClient.user?.tag}!`);
  } catch (error) {
    console.error("Error logging in to Discord:", error);
    throw error;
  }

  return discordClient;
}

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

    if (isLocationUpdated && cleanedData.discord) {
      const discord = await getDiscordClient();
      const { ChannelType } = await import("discord.js");

      const nearestCity = await getNearestCity(
        cleanedData.latitude,
        cleanedData.longitude
      );

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

        const guild = await discord.guilds.fetch(process.env.DISCORD_GUILD_ID);
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

      const guild = await discord.guilds.fetch(
        process.env.DISCORD_GUILD_ID || "1259076591900692490"
      );
      const member = await guild.members.fetch(cleanedData.discord);
      const channel = await guild.channels.fetch(cityGroup.groupId);

      if (
        channel &&
        (channel.type === ChannelType.GuildText ||
          channel.type === ChannelType.PublicThread ||
          channel.type === ChannelType.PrivateThread)
      ) {
        await channel.send(
          `Welcome ${member.user.username} to ${nearestCity}!`
        );
      } else {
        console.error("Channel not found or invalid type:", cityGroup.groupId);
      }
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
