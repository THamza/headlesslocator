# Headless Friend Finder

**Headless Friend Finder** is a simple community finder app built with Next.js, Clerk, Leaflet, and Prisma. The app allows users to view and share their location with others in the community.

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [APIs](#apis)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- PostgreSQL

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```env
# Database
DATABASE_URL="your_database_url"
# Prisma Direct URL for production
DIRECT_URL="your_production_direct_url"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/profile
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/profile

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your_recaptcha_site_key"

# Resend Email Service
RESEND_EMAIL_SERVICE_KEY="your_resend_email_service_key"

# PostHog
NEXT_PUBLIC_POSTHOG_KEY="your_posthog_key"
NEXT_PUBLIC_POSTHOG_HOST="https://your_posthog_host"

# Discord
DISCORD_APPLICATION_ID="your_discord_application_id"
DISCORD_PUBLIC_KEY="your_discord_public_key"
DISCORD_GUILD_ID="your_discord_guild_id"
DISCORD_CATEGORY_ID="your_discord_category_id"
NEXT_PUBLIC_DISCORD_REDIRECT_URI="your_discord_redirect_uri"
NEXT_PUBLIC_DISCORD_CLIENT_ID="your_discord_client_id"
DISCORD_CLIENT_SECRET="your_discord_client_secret"
DISCORD_BOT_TOKEN="your_discord_bot_token"

# App Domain
NEXT_PUBLIC_APP_DOMAIN="http://localhost:3000"

```

# Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/headlesscommunitylocator.git
cd headlesscommunitylocator
```

## Install dependencies

```bash
Copy code
npm install
# or
yarn install
```

## Database Setup

1. Ensure PostgreSQL is installed and running on your machine.
2. Create a database and update the `DATABASE_URL` in your `.env` file.
3. Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev --name init
```

4. Generate Prisma Client:

```bash
npx prisma generate
```

## Running the Project

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

```
.
├── app
│   ├── api
│   │   ├── email
│   │   │   └── user-list.tsx
│   │   ├── profile
│   │   │   └── [id]
│   │   │       └── route.ts
│   │   └── user-within-radius
│   │       └── route.ts
│   ├── layout.tsx
│   ├── map
│   │   └── page.tsx
│   ├── profile
│   │   └── page.tsx
│   ├── providers
│   │   └── posthog
│   │       └── PHProvider.tsx
│   ├── sign-in
│   │   └── page.tsx
│   └── sign-up
│       └── page.tsx
├── components
│   ├── Header.tsx
│   ├── LeafletMap.tsx
│   ├── ProfileEdit.tsx
│   ├── SignUpQuiz.tsx
│   ├── TelegramUsernameTutorial.tsx
│   ├── footer.tsx
│   └── ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── slider.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       └── toaster.tsx
├── lib
│   ├── constants.ts
│   └── utils.ts
├── prisma
│   └── schema.prisma
├── public
│   ├── bg.jpeg
│   ├── bg2.webp
│   ├── bg3.webp
│   └── theheadlessway.png
├── styles
│   └── globals.css
├── .env
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Key Features

- User Authentication: Secure user authentication using Clerk.
- Location Sharing: Users can share and view their location on a map.
- Email Notifications: Users receive notifications when new members join nearby.
- Community Integration: Integration with Discord for community chat and collaboration.
- Profile Management: Users can manage and update their profiles.

## APIs

### Profile API

- **GET /api/profile/[id]**

  - Fetch the profile of the signed-in user.

- **POST /api/profile/[id]**
  - Update the profile of the signed-in user.

### User Within Radius API

- **POST /api/users-within-radius**
  - Fetch users within a specified radius of a given location.

### Registration Request API

- **POST /api/registration-request**
  - Create a new registration request.

### Email API

- **POST /api/email/user-list**
  - Send an email with a list of nearby users.

## Scripts

- **dev**: Run the development server.
- **build**: Build the application for production.
- **start**: Start the production server.
- **lint**: Run ESLint to check for linting errors.
- **postinstall**: Generate Prisma Client after dependencies are installed.

## TODO:

- Code cleaning, componizing and refactoring

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or suggestions.
