"use client"

export default function Features() {
  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
        </svg>
      ),
      title: "Deteksi Instan",
      description: "Hasil analisis kesegaran buah dalam hitungan detik menggunakan teknologi AI yang canggih",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Akurasi Tinggi",
      description: "Model CNN terlatih dengan ribuan gambar buah untuk memberikan prediksi yang akurat dan terpercaya",
      gradient: "from-green-400 to-teal-500"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 16L12 21L20 16M4 12L12 17L20 12M12 3L4 8L12 13L20 8L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "CNN Architecture",
      description: "Menggunakan Convolutional Neural Network untuk ekstraksi fitur visual yang mendalam",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      ),
      title: "User Friendly",
      description: "Interface intuitif dan mudah digunakan, cukup upload gambar dan dapatkan hasil analisis",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 5V3M12 21V19M5 12H3M21 12H19M6.34315 6.34315L4.92893 4.92893M19.0711 19.0711L17.6569 17.6569M6.34315 17.6569L4.92893 19.0711M19.0711 4.92893L17.6569 6.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Privacy First",
      description: "Semua proses dilakukan secara lokal, gambar tidak disimpan atau dibagikan ke server",
      gradient: "from-red-400 to-rose-500"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M3 12C3 7.02944 7.02944 3 12 3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: "Multi-Platform",
      description: "Dapat diakses dari berbagai device: desktop, tablet, atau smartphone dengan responsif",
      gradient: "from-cyan-400 to-blue-500"
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-teal-700 font-medium mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Teknologi AI terdepan untuk membantu Anda mendeteksi kesegaran buah dengan mudah dan akurat
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-200 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-linear-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* CONTENT */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* STATS SECTION */}
        <div className="mt-20 bg-linear-to-br from-teal-600 to-emerald-500 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold">95%+</div>
              <div className="text-teal-100">Akurasi Model</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">&lt;2s</div>
              <div className="text-teal-100">Waktu Deteksi</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">10K+</div>
              <div className="text-teal-100">Data Training</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}