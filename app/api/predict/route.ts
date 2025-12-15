// File: app/api/predict/route.ts
// Install dulu: npm install @gradio/client

import { NextResponse } from 'next/server';
import { Client } from "@gradio/client";

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    // Konversi base64 ke Blob
    const base64Data = image.split(',')[1];
    const mimeType = image.split(',')[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    
    // Konversi base64 string ke buffer lalu ke Blob
    const buffer = Buffer.from(base64Data, 'base64');
    const blob = new Blob([buffer], { type: mimeType });

    console.log('Connecting to Gradio Space...');
    
    // Connect ke Hugging Face Space
    const client = await Client.connect("dalvero/deteksi-buah-ai");
    
    console.log('Sending prediction request...');
    
    // Panggil fungsi predict (sesuaikan dengan nama function di Gradio)
    const result = await client.predict("/predict", { 
      image: blob 
    });

    console.log('Result received:', result);

    // result.data biasanya array [image_output]
    return NextResponse.json({ 
      success: true, 
      data: result.data 
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Gagal memproses gambar',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}

// Tambahkan config untuk Next.js
export const runtime = 'nodejs';
export const maxDuration = 30; // 30 detik timeout