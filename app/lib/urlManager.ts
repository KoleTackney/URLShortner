"use server"

import { db } from "@/db";
import { URLTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { encode, decode } from "@/lib/baseConverter"



const getURLbyID = async () => {

}

export const createNewURL = async (newURL: string) => {
    let resID;
    let resURL;

    //Check if url already exist
    const urls = await db.select().from(URLTable).where(eq(URLTable.url, newURL));

    if (urls.length > 0) {
        console.log("URL already exist");
        resID = urls[0].id;
        resURL = urls[0].url;
    }
    else {
        console.log("New URL, Adding to DB");
        await db.insert(URLTable).values({ url: newURL });
        const URLResult = await db.select().from(URLTable).where(eq(URLTable.url, newURL));
        resID = URLResult[0].id;
        resURL = URLResult[0].url;
    }

    return {
        urlID: await encode(resID), URL: resURL
    }
}