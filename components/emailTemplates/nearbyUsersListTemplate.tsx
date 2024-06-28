import * as React from "react";

interface NearbyUsersListTemplateProps {
  firstName: string;
  users: Array<{
    name: string;
    email: string;
    username: string;
    interests: string;
  }>;
}

export const NearbyUsersListTemplate: React.FC<
  NearbyUsersListTemplateProps
> = ({ firstName, users }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      padding: "20px",
      color: "#333",
    }}
  >
    <h1 style={{ color: "#000" }}>Hello, {firstName}!</h1>
    <p>Here is a list of users nearby:</p>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
              backgroundColor: "#f2f2f2",
            }}
          >
            Name
          </th>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
              backgroundColor: "#f2f2f2",
            }}
          >
            Email
          </th>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
              backgroundColor: "#f2f2f2",
            }}
          >
            Username
          </th>
          <th
            style={{
              border: "1px solid #ddd",
              padding: "8px",
              backgroundColor: "#f2f2f2",
            }}
          >
            Interests
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {user.name}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {user.email}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              @{user.username}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {user.interests}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <p>Best regards,</p>
    <p>Headless CL Team</p>
  </div>
);
