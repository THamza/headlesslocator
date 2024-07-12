import { PrismaClient } from "@prisma/client";
import { getNearestCity } from "@/lib/utils";

const prisma = new PrismaClient();

let discordClient: any = null;

export async function getDiscordClient() {
  if (discordClient) return discordClient;

  const { Client, GatewayIntentBits } = await import("discord.js");

  discordClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
    ],
  });

  try {
    await discordClient.login(process.env.DISCORD_BOT_TOKEN);
  } catch (error) {
    console.error("Error logging in to Discord:", error);
    throw error;
  }

  return discordClient;
}

export async function handleDiscordChannelAssignment(userData: {
  latitude: number;
  longitude: number;
  discord: string;
}) {
  try {
    const discord = await getDiscordClient();
    const { ChannelType } = await import("discord.js");

    const nearestCity = await getNearestCity(
      userData.latitude,
      userData.longitude
    );

    console.log("Nearest city determined:", nearestCity);

    let cityGroup = await prisma.cityGroup.findUnique({
      where: { city: nearestCity },
    });

    if (!cityGroup) {
      if (!process.env.DISCORD_GUILD_ID || !process.env.DISCORD_CATEGORY_ID) {
        throw new Error("Discord environment variables not set");
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
      console.log("New city group created with channel ID:", channel.id);
    } else {
      console.log(
        "City group already exists with channel ID:",
        cityGroup.groupId
      );
    }

    const guild = await discord.guilds.fetch(process.env.DISCORD_GUILD_ID);
    console.log("Guild fetched successfully");

    const member = await guild.members.fetch(userData.discord);
    console.log("Member fetched successfully");

    // Ensure the Profile exists for the user before adding to the UserCityGroup
    const profile = await prisma.profile.findFirst({
      where: { discord: userData.discord },
    });

    if (!profile) {
      console.error(`Profile not found for user: ${userData.discord}`);
      return;
    }

    // Check if the user is already part of the city group in the database
    const userCityGroup = await prisma.userCityGroup.findUnique({
      where: {
        userId_cityGroupId: {
          userId: profile.id,
          cityGroupId: cityGroup.id,
        },
      },
    });

    if (!userCityGroup) {
      // If the user is not part of the city group, add them to the group and send a welcome message
      await prisma.userCityGroup.create({
        data: {
          userId: profile.id,
          cityGroupId: cityGroup.id,
        },
      });

      const channel = await guild.channels.fetch(cityGroup.groupId);
      console.log("Fetching channel with ID:", cityGroup.groupId);

      if (
        channel &&
        (channel.type === ChannelType.GuildText ||
          channel.type === ChannelType.PublicThread ||
          channel.type === ChannelType.PrivateThread)
      ) {
        await channel.send(
          `Welcome ${member.user.username} to ${nearestCity}!`
        );
        console.log(`Message sent to channel ${cityGroup.groupId}`);
      } else {
        console.error("Channel not found or invalid type:", cityGroup.groupId);
      }
    } else {
      console.log(
        `Member ${member.user.username} already part of the city group ${cityGroup.groupId}`
      );
    }
  } catch (error) {
    console.error("Error assigning Discord channel:", error);
    throw error;
  }
}
