import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    // Ubah base64 ke blob
    const base64Data = image.split(',')[1];
    const blob = Buffer.from(base64Data, 'base64');

    // Endpoint Gradio yang benar
    const HF_SPACE_URL = "https://dalvero-deteksi-buah-ai.hf.space";
    
    // Step 1: Upload file ke Gradio
    const formData = new FormData();
    formData.append('files', new Blob([blob], { type: 'image/jpeg' }), 'image.jpg');
    
    const uploadResponse = await fetch(`${HF_SPACE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error('Upload gagal');
    }

    const uploadData = await uploadResponse.json();
    const fileUrl = uploadData[0]; // URL file yang di-upload

    // Step 2: Panggil endpoint predict dengan file URL
    const predictResponse = await fetch(`${HF_SPACE_URL}/call/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [fileUrl] // Kirim URL file, bukan base64
      }),
    });

    if (!predictResponse.ok) {
      throw new Error('Predict gagal');
    }

    const predictData = await predictResponse.json();
    const eventId = predictData.event_id;

    // Step 3: Ambil hasil dari streaming endpoint
    const resultResponse = await fetch(`${HF_SPACE_URL}/call/predict/${eventId}`, {
      method: 'GET',
    });

    // Parse streaming response
    const reader = resultResponse.body?.getReader();
    const decoder = new TextDecoder();
    let result = null;

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.output) {
                result = data.output;
              }
            } catch (e) {
              console.error('Parse error:', e);
            }
          }
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      data: result 
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memproses gambar' },
      { status: 500 }
    );
  }
}