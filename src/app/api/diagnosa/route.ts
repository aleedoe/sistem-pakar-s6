import { diagnosePenyakit } from '@/utils/forwardChaining';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { gejala } = body;

        if (!Array.isArray(gejala) || gejala.length === 0) {
            return NextResponse.json({ success: false, message: 'Gejala tidak boleh kosong' }, { status: 400 });
        }

        const hasil = await diagnosePenyakit(gejala);
        return NextResponse.json({ success: true, data: hasil });
    } catch (error) {
        console.error('Diagnosa error:', error);
        return NextResponse.json({ success: false, message: 'Terjadi kesalahan server' }, { status: 500 });
    }
}
