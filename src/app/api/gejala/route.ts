// src/app/api/gejala/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const gejala = await prisma.gejala.findMany();
        return NextResponse.json({
            success: true,
            data: gejala,
        });
    } catch (error) {
        console.error('Error fetching gejala:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
        }, { status: 500 });
    }
}
