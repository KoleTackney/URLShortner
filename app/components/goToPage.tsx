"use client";

import { useRouter } from "next/navigation";

export default function GoToPage({ url }: { url: string }) {
  const router = useRouter();
  router.push(url);

  return <div>Going to page: {url}</div>;
}
