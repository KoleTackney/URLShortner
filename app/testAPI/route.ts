import { NextResponse } from 'next/server'

export async function GET() {
    console.log("Hello world");

    return "hi";
}