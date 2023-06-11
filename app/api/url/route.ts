import { db } from "@/db";
import { URLTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

//export const runtime = 'edge' // 'nodejs' is the default runtime

export async function GET(request: NextRequest) {
    //Expect request to provide us a alpha numeric string
    const { searchParams } = new URL(request.url);
    //check DB for id
    if (!searchParams.has('id')) {
        return "No id provided";
    }
    const id = Number.parseInt(searchParams.get('id')!);
    const urls = await db.select().from(URLTable).where(eq(URLTable.id, id));
    return urls[0].url;
}

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const ourURL = searchParams.get('url');
    if (!ourURL) {
        return "No url provided";
    }
    const urls = await db.select().from(URLTable).where(eq(URLTable.url, ourURL));
    if (urls.length > 0) {
        return urls[0].id;
    }
    const newURL = await db.insert(URLTable).values({ url: ourURL })// .returning({ id: URLTable.id });
    return newURL;
}