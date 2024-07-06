import { isContext } from "vm";

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getEnv = () => {
  return (
    process.env.NEXT_PUBLIC_VERCEL_ENV ||
    process.env.NEXT_PUBLIC_VERCEL_ENV ||
    process.env.NODE_ENV
  );
};

export const getBaseUrl = () => {
  const env = getEnv();

  // Prod. We can't use the vercel env as it will refer to an internal url
  if (env === "production") {
    return process.env.NEXT_PUBLIC_APP_DOMAIN;
  }

  // Preview branch
  if (process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL) {
    return `https://${
      process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL
    }`;
  }

  // Dev
  if (process.env.PORT) {
    return `http://localhost:${process.env.PORT}`;
  }

  return "http://localhost:3000";
};
