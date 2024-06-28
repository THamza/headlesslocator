import { getBaseUrl } from "@/components/utils/general";

export function getPosthogHostUrl() {
  return `${getBaseUrl()}/ingest`;
}
