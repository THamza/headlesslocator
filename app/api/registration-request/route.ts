// create a POST endpoint that would create a new registration request in the database given an email and a message
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();

  const { error, ...cleanedData } = data;

  const registrationRequest = await prisma.registrationRequest.create({
    data: cleanedData,
  });

  return NextResponse.json(registrationRequest);
}
