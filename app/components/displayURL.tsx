import React, { Component } from "react";

export default function DisplayURL({ url }: { url: string }) {
  async function addItem(url: string) {
    //"use server";

    //Check if URL is valid
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Invalid URL");
    }

    //Check if URL is already in database

    //Add URL to database

    //Return shortened URL
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-center">
        Your shortened URL is:
      </h1>
      <a
        className="text-6xl font-bold text-center"
        href={url}
      >
        {url}
      </a>
    </div>
  );
}
