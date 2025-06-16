-- CreateTable
CREATE TABLE "Gejala" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deskripsi" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Penyakit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "penyakitId" TEXT NOT NULL,
    CONSTRAINT "Rule_penyakitId_fkey" FOREIGN KEY ("penyakitId") REFERENCES "Penyakit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RuleGejala" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ruleId" TEXT NOT NULL,
    "gejalaId" TEXT NOT NULL,
    CONSTRAINT "RuleGejala_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RuleGejala_gejalaId_fkey" FOREIGN KEY ("gejalaId") REFERENCES "Gejala" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RuleGejala_ruleId_gejalaId_key" ON "RuleGejala"("ruleId", "gejalaId");
