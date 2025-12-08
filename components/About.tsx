"use client"

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-teal-700 font-medium mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 10V3L4 14H11L11 21L20 10H13Z" fill="currentColor"/>
            </svg>
            <span>About Project</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tentang Proyek Ini
          </h2>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - CONTENT */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Proyek ini merupakan implementasi model <span className="font-semibold text-teal-700">kecerdasan buatan berbasis Convolutional Neural Network (CNN)</span> untuk mengklasifikasikan kesegaran buah dengan akurasi tinggi.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Website ini dibangun menggunakan <span className="font-semibold text-teal-700">Next.js dan TailwindCSS</span>, dengan fokus pada kecepatan, kesederhanaan, dan kemudahan penggunaan untuk membantu pengguna dalam menentukan kualitas buah.
            </p>

            {/* TECH STACK */}
            <div className="pt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                {['Next.js', 'TailwindCSS', 'TensorFlow', 'CNN', 'React', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-teal-50 text-teal-700 rounded-xl font-medium border border-teal-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <a
                href="#upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-teal-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <span>Mulai Deteksi</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE - CONTENT */}
          <div className="relative">
            {/* MAIN CARD */}
            <div className="bg-linear-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 border border-teal-100">
              <div className="space-y-6">
                {/* MODEL INFO CARD */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-teal-600 to-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 16L12 21L20 16M4 12L12 17L20 12M12 3L4 8L12 13L20 8L12 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">CNN Architecture</h4>
                      <p className="text-sm text-gray-600">Deep learning model untuk klasifikasi gambar</p>
                    </div>
                  </div>
                </div>

                {/* ACCURACY CARD */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-green-600 to-teal-500 rounded-xl flex items-center justify-center shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">High Accuracy</h4>
                      <p className="text-sm text-gray-600">Trained dengan ribuan dataset gambar buah</p>
                    </div>
                  </div>
                </div>

                {/* REAL - TIME CARD */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-yellow-600 to-orange-500 rounded-xl flex items-center justify-center shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="white"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">Real-time Detection</h4>
                      <p className="text-sm text-gray-600">Hasil deteksi instan dalam hitungan detik</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DECORATIVE IMAGE */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-200 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-200 rounded-full blur-2xl opacity-50"></div>
          </div>
        </div>

        {/* PROCESS FLOW */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Cara Kerja Sistem
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Upload', desc: 'Unggah gambar buah Anda', icon: 'M3 16L12 21L21 16M3 12L12 17L21 12M12 3L3 8L12 13L21 8L12 3Z' },
              { step: '02', title: 'Process', desc: 'AI menganalisis gambar', icon: 'M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z' },
              { step: '03', title: 'Classify', desc: 'Model CNN melakukan klasifikasi', icon: 'M4 16L12 21L20 16M4 12L12 17L20 12M12 3L4 8L12 13L20 8L12 3Z' },
              { step: '04', title: 'Result', desc: 'Dapatkan hasil deteksi', icon: 'M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z' }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto bg-linear-to-br from-teal-600 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d={item.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}