import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { latitude, longitude } = req.body;

  if (!req.body || !latitude || !longitude) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // Get the authenticated user
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      latitude,
      longitude,
    },
  });

  res.status(200).json({ message: "Location updated successfully" });
}
