import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export const createOrJoinGroup = async (city: string, userId: string) => {
  try {
    // Check if the city group already exists in the database
    let cityGroup = await prisma.cityGroup.findUnique({ where: { city } });

    if (!cityGroup) {
      // Create a new Telegram group for the city
      const newGroupResponse = await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/createChatInviteLink`,
        { chat_id: city }
      );
      const groupId = newGroupResponse.data.result.invite_link;

      // Save the new group in the database
      cityGroup = await prisma.cityGroup.create({
        data: {
          city,
          groupId,
        },
      });
    }

    // Add the user to the Telegram group
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/addChatMember`,
      { chat_id: cityGroup.groupId, user_id: userId }
    );

    return cityGroup;
  } catch (error) {
    console.error("Error creating or joining Telegram group", error);
    throw error;
  }
};
