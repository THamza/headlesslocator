import * as React from "react";

interface RegistrationRequestTemplateProps {
  email: string;
  message: string;
}

export const RegistrationRequestTemplate: React.FC<
  RegistrationRequestTemplateProps
> = ({ email, message }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      padding: "20px",
      color: "#333",
    }}
  >
    <h1 style={{ color: "#000" }}>New Registration Request</h1>
    <p>
      Someone has answered the quiz incorrectly but has left their contact
      details for further assistance.
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
    <p>
      <strong>Message:</strong>
    </p>
    <p>{message}</p>
  </div>
);
