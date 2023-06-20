"use client";

import { useRouter } from "next/navigation";

export function GoToPage({ url }: { url: string }) {
  const router = useRouter();
  const onClick = () => {
    router.replace(url); // Do we want to replace the current page in the history stack or add a new one?
  };

  return (
    <button
      className="bg-violet-300 border-red-500 border px-5 py-3 m-5 rounded-xl"
      onClick={onClick}
    >
      Proceed
    </button>
  );
}
