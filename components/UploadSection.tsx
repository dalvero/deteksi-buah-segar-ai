"use client";

import { useState } from "react";

export default function UploadSection() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleAnalyze() {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  }

  return (
    <section id="upload" className="py-24 w-full bg-linear-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-teal-700 font-medium mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 16L12 21L21 16M3 12L12 17L21 12M12 3L3 8L12 13L21 8L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Step 1: Upload Image</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Upload Gambar Buah
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih atau seret gambar buah untuk mendeteksi kesegarannya secara otomatis
          </p>
        </div>

        {/* UPLOAD CARD */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          {/* DRAG & DROP AREA */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-teal-500 bg-teal-50' 
                : 'border-gray-300 bg-gray-50 hover:border-teal-400 hover:bg-teal-25'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="file-upload"
            />
            
            {!imagePreview ? (
              <div className="space-y-4">
                {/* UPLOAD ICON */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-linear-to-br from-teal-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L2.621 19.485C2.725 19.904 3.093 20.204 3.523 20.204H20.477C20.907 20.204 21.275 19.904 21.379 19.485L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* TEXT */}
                <div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Seret & lepas gambar di sini
                  </p>
                  <p className="text-gray-500 mb-4">atau</p>
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-3 bg-linear-to-r from-teal-600 to-emerald-500 text-white rounded-xl font-semibold cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Pilih File
                  </label>
                </div>

                {/* FORMAT YANG DIDUKUNG */}
                <p className="text-sm text-gray-400 mt-4">
                  Format: JPG, PNG, WEBP (Max 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto max-h-96 rounded-2xl shadow-xl object-contain mx-auto"
                  />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* BUTTONS ACTION */}
          {imagePreview && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 py-4 bg-linear-to-r from-teal-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
                    </svg>
                    <span>Analyze Freshness</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => setImagePreview(null)}
                className="sm:w-auto px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Upload Ulang
              </button>
            </div>
          )}

          {/* INFO CARDS */}
          {!imagePreview && (
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#0D9488"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-teal-900 mb-1">Cepat</h4>
                  <p className="text-sm text-teal-700">Hasil dalam hitungan detik</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-900 mb-1">Akurat</h4>
                  <p className="text-sm text-emerald-700">AI model terlatih</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#2563EB" strokeWidth="2"/>
                    <path d="M12 5V3M12 21V19M5 12H3M21 12H19M6.34315 6.34315L4.92893 4.92893M19.0711 19.0711L17.6569 17.6569M6.34315 17.6569L4.92893 19.0711M19.0711 4.92893L17.6569 6.34315" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Aman</h4>
                  <p className="text-sm text-blue-700">Data tidak disimpan</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}