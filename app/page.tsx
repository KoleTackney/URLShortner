/*
  This page will be the home page of the app. It will have a form that will take in a URL and then display the shortened URL.
  The shortened URL will be a link that will take the user to the original URL.
  The shortened URL will be stored in the database.
*/

"use client";
import React from "react";
import DisplayUrl from "./components/displayURL";
import { createNewURL } from "./lib/urlManager";
import { z } from "zod";

type shortURL = {
  URL: string;
  urlID: string;
};

export default function Home() {
  const [urlList, setUrlList] = React.useState(new Array<shortURL>());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = z.string().max(256, {
      message: "URL too large, max character length is currently 256",
    }).url()
      .safeParse(
        e.currentTarget.URL.value,
      );
    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      alert(errorMessage);
      return;
    }

    //Add to database, display shortened URL
    const res = await createNewURL(result.data);
    const newURL = { URL: res.URL!, urlID: res.urlID };
    setUrlList([...urlList, newURL]);
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
      {urlList.length > 0 && ( // If there are shortened URLs, display them
        <h1 className="text-6xl font-bold text-center">
          Your shortened URLs are:
        </h1>
      )}
      {urlList.length > 0 &&
        urlList.map((short) => (
          <DisplayUrl key={short.urlID} url={short.URL} urlID={short.urlID} />
        ))}
    </main>
  );
}
