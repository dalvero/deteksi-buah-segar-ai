import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { image } = await req.json();

  const response = await fetch(
    "https://dalvero-deteksi-buah-ai.hf.space/api/predict",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [image], // HARUS array
      }),
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}
