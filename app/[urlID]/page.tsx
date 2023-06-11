import React from "react";
import GoToPage from "../components/goToPage";

interface PageProps {
  params: {
    urlID: string;
  };
}

export default async function page({ params }: PageProps) {
  "use server";
  const urlID = params.urlID;
  // add call to DB, find urlID, and return url
  const turl = `https://www.google.com/search?q=${urlID}`;
  return (
    <div>
      <GoToPage url={turl} />
    </div>
  );
}
