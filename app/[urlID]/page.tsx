"use server";

import React from "react";
import { GoToPage } from "@/components/goToPage";
import { decode } from "@/lib/baseConverter";
import { db } from "@/db";
import { URLTable } from "@/db/schema";
import { eq } from "drizzle-orm";

interface PageProps {
  params: {
    urlID: string;
  };
}

export default async function page({ params }: PageProps) {
  "use server";
  const urlCode = params.urlID;
  console.log(urlCode);
  const urlID = await decode(urlCode);
  const urls = await db.select().from(URLTable).where(eq(URLTable.id, urlID));
  const url = urls[0].url;

  if (!url) {
    return <div>URL not found</div>;
  } else {
    return (
      <div className="flex flex-col items-center justify-start">
        <h1 className="text-lg">You are about to head to</h1>
        <h2 className="text-4xl">{url}</h2>
        <GoToPage url={url!} />
      </div>
    );
  }
}
