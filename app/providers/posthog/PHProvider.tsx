"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { getPosthogHostUrl } from "./posthog.utils";
import Cookies from "js-cookie";

if (typeof window !== "undefined") {
  const flags = Cookies.get("bootstrapData");

  let bootstrapData = {} as any;

  if (flags) {
    bootstrapData = JSON.parse(flags);
  }

  posthog.init(
    process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      "phc_F9h4R7XeLchM0ek1k5HLe5ofrdte9c3hB6DRsmjHx9T",
    {
      //TODO: Fix this, for some reason, this specific key is not found on production
      api_host: getPosthogHostUrl(),
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      bootstrap: bootstrapData,
    },
  );
}

export function PostHogPageview(): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return <></>;
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={<div>Loading...</div>}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
