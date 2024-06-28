import { NearbyUsersListTemplate } from "@/components/emailTemplates/nearbyUsersListTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_EMAIL_SERVICE_KEY);

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { firstName, email, users } = await request.json();

  const plainTextContent = `Hello, ${firstName}!\n\nHere is a list of users nearby:\n\n${users
    .map(
      (user: any) => `
Name: ${user.name}
Email: ${user.email}
Username: @${user.username}
Interests: ${user.interests}
`
    )
    .join("\n")}\n\nBest regards,\nYour App Team`;

  const { data: emailData, error: emailError } = await resend.emails.send({
    from: "Headless CL <headless-community-locator@resend.dev>",
    to: [email], // Send to the logged-in user
    subject: "Nearby Users List",
    text: plainTextContent,
    react: NearbyUsersListTemplate({ firstName, users }),
  });

  if (emailError) {
    return NextResponse.json({ error: emailError.message }, { status: 500 });
  }

  return NextResponse.json(emailData, { status: 200 });
}
