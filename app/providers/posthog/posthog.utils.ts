import { getBaseUrl } from "@/lib/general";

export function getPosthogHostUrl() {
  return `${getBaseUrl()}/ingest`;
}
