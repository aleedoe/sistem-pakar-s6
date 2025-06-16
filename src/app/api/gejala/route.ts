// src/app/api/gejala/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const gejala = await prisma.gejala.findMany();
        return NextResponse.json(gejala);
    } catch (error) {
        console.error('Error fetching gejala:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
