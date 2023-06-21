import React, { Component } from "react";
import Link from "next/link";

interface DisplayURLProps {
  url: string;
  urlID: string;
}

const MAX_URL_LENGTH = 50;

export default function DisplayURL({ url, urlID }: DisplayURLProps) {
  const BASE_URL = window.location.origin;
  const completeURL = new URL(urlID, BASE_URL).toString();

  const onClick = () => {
    navigator.clipboard.writeText(completeURL);
    alert("Copied to clipboard");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-slate-800 bg-opacity-50 p-2 m-5 space-x-5 flex flex-row justify-center items-center border-2 rounded-lg">
        <div className="flex flex-col items-start m-2">
          <div className="flex space-x-5">
            <p className="text-l font-bold text-center">
              Original URL:
            </p>
            <Link
              className="text-l font-bold text-center"
              href={url}
            >
              {url.substring(0, MAX_URL_LENGTH)}{" "}
              {url.length >= MAX_URL_LENGTH && "..."}
            </Link>
          </div>
          <div className="flex justify-center items-center space-x-10">
            <p className="text-L font-bold text-center">
              Shortened URL:
            </p>
            <Link
              className="text-l font-bold text-center"
              href={completeURL}
            >
              {completeURL}
            </Link>
          </div>
        </div>
        <button
          className="border rounded-lg p-4 mx-5 my-2 motion-safe:hover:scale-105 motion-safe:hover:stroke-transparent motion-safe:hover:fill-transparent motion-safe:hover:text-violet-200"
          onClick={onClick}
        >
          copy
        </button>
      </div>
    </div>
  );
}
