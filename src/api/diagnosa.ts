import { NextApiRequest, NextApiResponse } from 'next';
import { diagnosePenyakit } from '@/utils/forwardChaining';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { gejala } = req.body;

    if (!Array.isArray(gejala) || gejala.length === 0) {
        return res.status(400).json({ error: 'Gejala tidak boleh kosong' });
    }

    try {
        const hasil = await diagnosePenyakit(gejala);
        return res.status(200).json({ hasil });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
}
