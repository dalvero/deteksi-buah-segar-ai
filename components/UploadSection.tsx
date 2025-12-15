"use client";

import { useState, useRef, useEffect } from "react";

export default function UploadSection() {
  // State Utama
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  
  // State UI
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // State & Ref untuk Webcam
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // --- LOGIKA WEBCAM ---

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      // Catatan: srcObject di-set di useEffect di bawah agar menunggu elemen render dulu
    } catch (err) {
      console.error("Gagal akses kamera:", err);
      alert("Gagal mengakses kamera. Pastikan izin diberikan.");
    }
  };

  // EFFECT BARU: Menangani penyambungan stream ke video element saat elemen sudah muncul
  useEffect(() => {
    if (isCameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(e => console.log("Play error:", e));
    }
  }, [isCameraActive, stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set ukuran canvas sesuai video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const capturedFile = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
            setFile(capturedFile);
            setImagePreview(URL.createObjectURL(capturedFile));
            stopCamera(); 
            setResult(null);
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };

  // Matikan kamera jika komponen di-unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // --- LOGIKA UPLOAD BIASA ---
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
    setResult(null);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setImagePreview(URL.createObjectURL(droppedFile));
      setResult(null);
      setActiveTab('upload');
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  // --- LOGIKA ANALISIS LOKAL ---
  async function handleAnalyze() {
    if (!file) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // LOCAL
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung ke server AI");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mendeteksi. Pastikan backend Python nyala!");
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleReset() {
    setImagePreview(null);
    setFile(null);
    setResult(null);
    stopCamera();
  }

  function handleTabChange(tab: 'upload' | 'camera') {
    setActiveTab(tab);
    if (tab === 'upload') {
        stopCamera();
    }
  }

  return (
    <section id="upload" className="py-24 w-full bg-linear-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-teal-700 font-medium mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 16L12 21L21 16M3 12L12 17L21 12M12 3L3 8L12 13L21 8L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Step 1: Ambil Gambar</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Deteksi Kualitas Buah
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload file dari galeri atau gunakan kamera langsung untuk mendeteksi
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          
          {/* TAB SWITCHER */}
          {!imagePreview && (
            <div className="flex p-1 bg-gray-100 rounded-xl mb-6 w-fit mx-auto">
                <button
                    onClick={() => handleTabChange('upload')}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                        activeTab === 'upload' 
                        ? 'bg-white text-teal-700 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    📁 Upload File
                </button>
                <button
                    onClick={() => handleTabChange('camera')}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                        activeTab === 'camera' 
                        ? 'bg-white text-teal-700 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    📸 Kamera
                </button>
            </div>
          )}

          {/* AREA LOGIKA TAMPILAN */}
          <div className="min-h-[300px] flex flex-col justify-center">
            
            {/* 1. JIKA SUDAH ADA GAMBAR PREVIEW/HASIL */}
            {imagePreview ? (
               <div className="space-y-4 text-center">
                <div className="relative inline-block w-full max-w-2xl">
                  <img
                    src={result?.image_base64 ? `data:image/jpeg;base64,${result.image_base64}` : imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto max-h-[500px] rounded-2xl shadow-xl object-contain mx-auto"
                  />
                  
                  {result && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-teal-200">
                      <span className="text-teal-700 font-bold flex items-center gap-2">
                        <span>✅</span> Selesai
                      </span>
                    </div>
                  )}

                  <button
                    onClick={handleReset}
                    className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center z-10"
                    title="Hapus / Ulangi"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {!result && (
                     <div className="mt-8 flex justify-center">
                     <button
                       onClick={handleAnalyze}
                       disabled={isAnalyzing}
                       className="w-full sm:w-auto px-10 py-4 bg-linear-to-r from-teal-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                     >
                       {isAnalyzing ? (
                         <>
                           <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           <span>Sedang Menganalisis...</span>
                         </>
                       ) : (
                         <>
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
                           </svg>
                           <span>Analisis Sekarang</span>
                         </>
                       )}
                     </button>
                   </div>
                )}
              </div>
            
            // 2. JIKA TAB KAMERA AKTIF
            ) : activeTab === 'camera' ? (
                <div className="flex flex-col items-center justify-center w-full">
                    {!isCameraActive ? (
                        <div className="text-center py-12">
                             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">📸</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Gunakan Kamera</h3>
                            <p className="text-gray-500 mb-6">Izinkan akses kamera untuk mengambil foto langsung</p>
                            <button 
                                onClick={startCamera}
                                className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
                            >
                                Buka Kamera
                            </button>
                        </div>
                    ) : (
                        <div className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-lg">
                            {/* VIDEO ELEMENT FIXED */}
                            <video 
                                ref={videoRef} 
                                autoPlay 
                                playsInline
                                muted 
                                className="w-full min-h-[400px] object-cover bg-black"
                            />
                            {/* Hidden canvas for capture */}
                            <canvas ref={canvasRef} className="hidden" />
                            
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                                <button
                                    onClick={captureImage}
                                    className="w-16 h-16 rounded-full bg-white border-4 border-teal-500 shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
                                    title="Ambil Gambar"
                                >
                                    <div className="w-12 h-12 rounded-full bg-teal-500"></div>
                                </button>
                                <button
                                    onClick={stopCamera}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30"
                                    title="Tutup Kamera"
                                >
                                     ❌
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            // 3. JIKA TAB UPLOAD AKTIF (DEFAULT)
            ) : (
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
                    
                    <div className="space-y-4">
                        <div className="flex justify-center">
                        <div className="w-20 h-20 bg-linear-to-br from-teal-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 17L2.621 19.485C2.725 19.904 3.093 20.204 3.523 20.204H20.477C20.907 20.204 21.275 19.904 21.379 19.485L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        </div>
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
                        <p className="text-sm text-gray-400 mt-4">
                        Format: JPG, PNG, WEBP (Max 10MB)
                        </p>
                    </div>
                </div>
            )}
          </div>

          {/* HASIL DETEKSI (RINCIAN) */}
          {result && (
            <div className="mt-8 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Rincian Deteksi:</h3>
              
              {result.detections && result.detections.length > 0 ? (
                <div className="grid gap-3">
                  {result.detections.map((det: any, index: number) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg">
                          #{index + 1}
                        </span>
                        <p className="font-bold text-lg text-gray-800 capitalize">{det.class}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm">
                          {(det.confidence * 100).toFixed(1)}% Confidence
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 italic">Tidak ada objek spesifik yang terdeteksi, tapi gambar sudah diproses.</p>
              )}
            </div>
          )}

          {!imagePreview && (
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl">
                 <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">✨</div>
                <div>
                  <h4 className="font-semibold text-teal-900 mb-1">Dual Mode</h4>
                  <p className="text-sm text-teal-700">Upload file atau Webcam</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
                 <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">🎯</div>
                <div>
                  <h4 className="font-semibold text-emerald-900 mb-1">Akurat</h4>
                  <p className="text-sm text-emerald-700">YOLOv8 Detection</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">⚡</div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Cepat</h4>
                  <p className="text-sm text-blue-700">Real-time processing</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}