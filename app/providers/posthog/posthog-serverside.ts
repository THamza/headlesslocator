import { PostHog } from "posthog-node";
import { getPosthogHostUrl } from "./posthog.utils";

export default function PostHogClient() {
  try {
    const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      host: getPosthogHostUrl(),
      flushAt: 1,
      flushInterval: 0,
    });
    return posthogClient;
  } catch (error) {
    console.error("PostHog initialization error:", error);
  }
}
