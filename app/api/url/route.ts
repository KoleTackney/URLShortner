import { db } from "@/db";
import { URLTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { encode, decode } from "@/lib/baseConverter"

//export const runtime = 'edge' // 'nodejs' is the default runtime

export async function GET(request: NextRequest) {
    //Expect request to provide us a alpha numeric string
    const { searchParams } = new URL(request.url);
    //check DB for id
    if (!searchParams.has('id')) {
        console.log('no id');
        return new NextResponse(JSON.stringify("no luck"));
    }
    const id = await decode(searchParams.get('id')!);
    const urls = await db.select().from(URLTable).where(eq(URLTable.id, id));
    return new NextResponse(JSON.stringify({ url: urls[0].url }), {
        status: 200
    });
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const ourURL = data.url
    if (!ourURL) {
        return "No url provided";
    }

    let resID;
    let resURL;

    const urls = await db.select().from(URLTable).where(eq(URLTable.url, ourURL));

    //Check if url already exist
    if (urls.length > 0) {
        resID = urls[0].id;
        resURL = urls[0].url;
    }
    else {
        console.log("New URL, Adding to DB");
        const newURL = await db.insert(URLTable).values({ url: ourURL });
        console.log(newURL);
        const addURL = await db.select().from(URLTable).where(eq(URLTable.url, ourURL));
        resID = addURL[0].id;
        resURL = addURL[0].url;
    }

    return new NextResponse(JSON.stringify({ url: resURL, urlID: await encode(resID) }), {
        status: 200
    });
}

