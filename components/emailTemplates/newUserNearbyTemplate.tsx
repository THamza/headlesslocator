import * as React from "react";

interface NewUserNearbyTemplateProps {
  firstName: string;
  newUser: {
    name: string;
    email: string;
    username: string;
    interests: string;
  };
}

export const NewUserNearbyTemplate: React.FC<NewUserNearbyTemplateProps> = ({
  firstName,
  newUser,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      padding: "20px",
      color: "#333",
    }}
  >
    <h1 style={{ color: "#000" }}>Hello, {firstName}!</h1>
    <p>
      A new user has joined within your notification radius. Here are their
      details:
    </p>
    <br />
    <p>
      <strong>Name:</strong> {newUser.name}
    </p>
    <p>
      <strong>Email:</strong> {newUser.email}
    </p>
    <p>
      <strong>Username:</strong> @{newUser.username}
    </p>
    <p>
      <strong>Interests:</strong> {newUser.interests}
    </p>
    <br />
    <p>Feel free to reach out and connect with them.</p>
    <p>Best regards,</p>
    <p>Headless CL Team</p>
  </div>
);
