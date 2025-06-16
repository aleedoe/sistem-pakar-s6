'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Stethoscope, ArrowRight, Leaf } from 'lucide-react';

interface Gejala {
  id: string;
  nama: string;
  deskripsi?: string;
}

interface Disease {
  ruleId: string;
  penyakitId: string;
  penyakit?: string;
}

export default function Home() {
  const [gejalaList, setGejalaList] = useState<Gejala[]>([]);
  const [selectedGejala, setSelectedGejala] = useState<string[]>([]);
  const [diagnosaResult, setDiagnosaResult] = useState<Disease[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchGejala();
  }, []);

  const fetchGejala = async () => {
    try {
      const response = await fetch('/api/gejala');
      const data = await response.json();
      if (data.success) {
        setGejalaList(data.data);
      }
    } catch (error) {
      console.error('Error fetching gejala:', error);
    }
  };

  const handleGejalaChange = (gejalaId: string, checked: boolean) => {
    setSelectedGejala(prev =>
      checked ? [...prev, gejalaId] : prev.filter(id => id !== gejalaId)
    );
  };

  const handleDiagnosa = async () => {
    if (selectedGejala.length === 0) {
      alert('Silakan pilih minimal satu gejala untuk melakukan diagnosa.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/diagnosa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gejala: selectedGejala }),
      });

      const data = await response.json();
      if (data.success) {
        setDiagnosaResult(data.data);
        setShowResult(true);
        setIsModalOpen(false);
      } else {
        alert(data.message || 'Terjadi kesalahan saat melakukan diagnosa');
      }
    } catch (error) {
      console.error('Error during diagnosis:', error);
      alert('Terjadi kesalahan saat melakukan diagnosa. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetDiagnosa = () => {
    setSelectedGejala([]);
    setDiagnosaResult([]);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Green Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-emerald-100/20 to-teal-100/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
            <div className="absolute top-32 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-teal-200/25 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-4 py-6">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">AgriExpert</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Beranda</a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Tentang</a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Kontak</a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-green-200">
              <Leaf className="h-4 w-4" />
              Sistem Pakar Pertanian Terdepan
              <ArrowRight className="h-3 w-3" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Sistem Pakar Diagnosa
              <span className="block text-green-600">Penyakit Tanaman Padi</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Mendiagnosa penyakit tanaman padi berdasarkan gejala yang Anda alami dengan teknologi sistem pakar modern dan akurat untuk meningkatkan hasil panen.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                    onClick={resetDiagnosa}
                  >
                    <Stethoscope className="mr-2 h-5 w-5" />
                    Diagnosa Sekarang
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-green-800 mb-2">
                      Pilih Gejala yang Anda Alami
                    </DialogTitle>
                    <p className="text-sm text-gray-500">
                      Centang semua gejala yang terlihat pada tanaman padi Anda untuk mendapatkan diagnosa yang akurat.
                    </p>
                  </DialogHeader>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gejalaList.map((gejala) => (
                      <div
                        key={gejala.id}
                        className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl border hover:shadow-sm transition"
                      >
                        <Checkbox
                          id={gejala.id}
                          checked={selectedGejala.includes(gejala.id)}
                          onCheckedChange={(checked) => handleGejalaChange(gejala.id, checked as boolean)}
                          className="mt-1 h-4 w-4"
                        />
                        <div className="flex-1">
                          <label htmlFor={gejala.id} className="text-sm font-medium leading-none cursor-pointer text-gray-800">
                            {gejala.nama}
                          </label>
                          {gejala.deskripsi && (
                            <p className="text-xs text-gray-500 mt-1">{gejala.deskripsi}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t mt-6">
                    <p className="text-sm text-gray-500">
                      {selectedGejala.length} gejala dipilih
                    </p>
                    <Button
                      onClick={handleDiagnosa}
                      disabled={isLoading || selectedGejala.length === 0}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isLoading ? 'Mendiagnosa...' : 'Diagnosa'}
                    </Button>
                  </div>
                </DialogContent>

              </Dialog>

              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg font-semibold rounded-xl"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        {showResult && diagnosaResult.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Hasil Diagnosa
            </h2>

            <div className="space-y-4">
              {diagnosaResult.map((disease) => (
                <Alert key={disease.ruleId} className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="ml-2">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-green-800">{disease.penyakit}</h3>
                        {/* Tingkat kecocokan bisa dihitung manual jika dibutuhkan */}
                      </div>

                      {/* Jika belum ada deskripsi/solusi, tampilkan placeholder atau abaikan */}
                      <p className="text-green-700 mb-3 italic">Deskripsi belum tersedia</p>

                      <div className="bg-white p-3 rounded-md border border-green-200">
                        <p className="text-sm font-medium text-green-800 mb-1">
                          Solusi Penanganan:
                        </p>
                        <p className="text-sm text-green-700 italic">Solusi belum tersedia</p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={resetDiagnosa}
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Diagnosa Ulang
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Mengapa Memilih Sistem Pakar Kami?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Diagnosa Akurat</h3>
                <p className="text-gray-600">
                  Sistem berbasis pengetahuan ahli dengan tingkat akurasi tinggi
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Solusi Lengkap</h3>
                <p className="text-gray-600">
                  Rekomendasi penanganan dan pencegahan yang komprehensif
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mudah Digunakan</h3>
                <p className="text-gray-600">
                  Interface sederhana yang dapat digunakan oleh semua kalangan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}