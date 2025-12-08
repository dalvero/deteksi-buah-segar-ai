"use client"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full pt-32 pb-24 overflow-hidden bg-linear-to-br from-teal-600 via-teal-500 to-emerald-400"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* ILUSTRASI BUAH MELAYANG */}
      <div className="absolute top-24 left-8 animate-bounce" style={{ animationDuration: '3s' }}>
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="55" r="35" fill="#FF6B6B" opacity="0.9"/>
          <ellipse cx="50" cy="50" rx="30" ry="32" fill="#FF8787"/>
          <path d="M50 20 Q45 15 40 20 Q45 18 50 20 Q55 18 60 20 Q55 15 50 20Z" fill="#4CAF50"/>
          <ellipse cx="40" cy="45" rx="8" ry="10" fill="#FFB3B3" opacity="0.6"/>
        </svg>
      </div>

      <div className="absolute top-40 right-16 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
        <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="60" rx="28" ry="35" fill="#FFA726"/>
          <ellipse cx="50" cy="55" rx="25" ry="30" fill="#FFB74D"/>
          <circle cx="50" cy="25" r="8" fill="#8BC34A"/>
          <rect x="48" y="25" width="4" height="15" fill="#7CB342"/>
          <ellipse cx="42" cy="50" rx="6" ry="8" fill="#FFCC80" opacity="0.5"/>
        </svg>
      </div>

      <div className="absolute bottom-32 left-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
        <svg width="75" height="75" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20 L65 50 L50 80 L35 50 Z" fill="#9C27B0" opacity="0.9"/>
          <path d="M50 25 L62 50 L50 75 L38 50 Z" fill="#BA68C8"/>
          <circle cx="50" cy="15" r="6" fill="#66BB6A"/>
          <ellipse cx="45" cy="45" rx="5" ry="7" fill="#CE93D8" opacity="0.4"/>
        </svg>
      </div>

      <div className="absolute bottom-24 right-24 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
        <svg width="65" height="65" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="32" fill="#FFEB3B" opacity="0.95"/>
          <circle cx="50" cy="50" r="28" fill="#FFF176"/>
          <ellipse cx="42" cy="45" rx="7" ry="9" fill="#FFF59D" opacity="0.6"/>
          <path d="M50 20 Q48 18 46 20 L50 25 L54 20 Q52 18 50 20Z" fill="#8BC34A"/>
        </svg>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold drop-shadow-2xl mb-6 leading-tight">
            Deteksi Kesegaran Buah <br/>
            <span className="bg-linear-to-r from-yellow-200 to-green-200 bg-clip-text text-transparent">
              Menggunakan AI
            </span>
          </h1>

          <p className="text-lg md:text-2xl mt-6 max-w-3xl mx-auto opacity-95 leading-relaxed font-light">
            Unggah gambar buahmu, dan biarkan model AI menentukan apakah buah tersebut masih segar atau tidak dalam hitungan detik.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <a
              href="#upload"
              className="group px-8 py-4 bg-white text-teal-700 font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>Coba Sekarang</span>
              <svg className="group-hover:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            
            <a
              href="#features"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-teal-700 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>

          {/* FEATURE PILLS */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
              </svg>
              <span>Hasil Instan</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Akurasi Tinggi</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 5V3M12 21V19M5 12H3M21 12H19M6.34315 6.34315L4.92893 4.92893M19.0711 19.0711L17.6569 17.6569M6.34315 17.6569L4.92893 19.0711M19.0711 4.92893L17.6569 6.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Mudah Digunakan</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM WAVE */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}