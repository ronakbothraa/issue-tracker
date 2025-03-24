import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    console.log(request)
    const user  = await prisma.user.findMany({ orderBy: { name: 'asc' } })
    return NextResponse.json(user)
}