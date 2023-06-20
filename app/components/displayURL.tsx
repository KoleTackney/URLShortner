import React, { Component } from "react";

interface DisplayURLProps {
  url: string;
  urlID: string;
}

export default function DisplayURL({ url, urlID }: DisplayURLProps) {
  const BASE_URL = window.location.origin;

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
