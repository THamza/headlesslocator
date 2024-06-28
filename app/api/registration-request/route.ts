import { RegistrationRequestTemplate } from "@/components/emailTemplates/registrationRequestTemplate";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_SERVICE_KEY);

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const requestData = await request.json();

  const { error: requestError, ...cleanedData } = requestData;

  const registrationRequest = await prisma.registrationRequest.create({
    data: cleanedData,
  });

  const profiles = await prisma.profile.findMany({
    where: {
      isAdmin: true,
    },
  });

  if (profiles.length === 0) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const adminEmails = profiles.map((profile) => profile.email);

  // Convert the React template to plain text
  const plainTextContent = `New registration request from ${cleanedData.email}.\nMessage: ${cleanedData.message}`;

  const { data: emailData, error: emailError } = await resend.emails.send({
    from: "Headless CL <headless-community-locator@resend.dev>",
    to: adminEmails,
    subject: "New Registration Request",
    text: plainTextContent,
    react: RegistrationRequestTemplate({
      email: cleanedData.email,
      message: cleanedData.message,
    }),
  });

  if (emailError) {
    return NextResponse.json({ error: emailError.message }, { status: 500 });
  }

  return NextResponse.json(registrationRequest);
}
