import { prisma } from "@/lib/prisma";

export const diagnosePenyakit = async (selectedGejala: string[]) => {
    // Ambil semua rule dan gejala terkait
    const rules = await prisma.rule.findMany({
        include: {
            penyakit: true,
            ruleGejala: {
                include: {
                    gejala: true,
                },
            },
        },
    });

    // Loop semua rule dan cocokkan
    const matched = rules.filter((rule) => {
        const requiredGejala = rule.ruleGejala.map(rg => rg.gejalaId);
        return requiredGejala.every(g => selectedGejala.includes(g));
    });

    return matched.map(rule => ({
        ruleId: rule.id,
        penyakitId: rule.penyakit.id,
        penyakit: rule.penyakit.nama,
    }));
};
