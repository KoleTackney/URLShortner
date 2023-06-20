import React, { Component } from "react";

const BASE_URL = "http://localhost:3000";

export default function DisplayURL(
  { url, urlID }: { url: string; urlID: string },
) {
  async function addItem(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Invalid URL");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-center">
        Your shortened URL is:
      </h1>
      <a
        className="text-6xl font-bold text-center"
        href={new URL(urlID, BASE_URL).toString()}
      >
        {new URL(urlID, BASE_URL).toString()}
      </a>
    </div>
  );
}
