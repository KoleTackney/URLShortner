/*
  This page will be the home page of the app. It will have a form that will take in a URL and then display the shortened URL.
  The shortened URL will be a link that will take the user to the original URL.
  The shortened URL will be stored in the database.
*/

"use client";
import React from "react";
import DisplayUrl from "./components/displayURL";

// put this an api endpoint wimport { db } from "@/db";

export default function Home() {
  const [url, setUrl] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("fetching...");
    fetch("/api/url", {});
    console.log("fetched");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUrl(formData.get("URL")?.toString() || "");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-6xl font-bold text-center">
        Enter a URL you want to shorten
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center justify-center"
      >
        <input
          type="URL"
          id="URL"
          name="URL"
          className="p-4 m-4 border-2 text-black border-black rounded-lg"
        />
        <button className="p-4 m-4 border-2 border-violet-900 bg-violet-400 rounded-lg">
          Shorten
        </button>
      </form>
      {url && <DisplayUrl url={url} />}
    </main>
  );
}
