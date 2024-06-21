import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lng, radius } = req.query;

  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(lng as string);
  const radiusInKm = parseFloat(radius as string);

  // Haversine formula to find users within the radius
  const users = await prisma.$queryRaw`
    SELECT *, (
      6371 * acos(
        cos(radians(${latitude})) *
        cos(radians(latitude)) *
        cos(radians(longitude) - radians(${longitude})) +
        sin(radians(${latitude})) *
        sin(radians(latitude))
      )
    ) AS distancess
    FROM "User"
    HAVING distance < ${radiusInKm}
    ORDER BY distance;
  `;

  res.status(200).json(users);
}
