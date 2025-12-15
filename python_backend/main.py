# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# from ultralytics import YOLO
# from PIL import Image
# import io
# import base64
# import numpy as np

# app = FastAPI()

# # Setup CORS agar bisa diakses Next.js
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load Model
# model = YOLO("objectdetection.pt")

# @app.get("/")
# def read_root():
#     return {"message": "API Deteksi Buah Siap!"}

# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     # 1. Baca gambar dari upload
#     image_bytes = await file.read()
#     image = Image.open(io.BytesIO(image_bytes))

#     # 2. Prediksi dengan YOLO
#     results = model(image)
#     result = results[0]

#     # 3. Ambil Data Teks (JSON)
#     detections = []
#     for box in result.boxes:
#         detections.append({
#             "class": result.names[int(box.cls)],
#             "confidence": float(box.conf),
#             "box": box.xyxy.tolist()[0]
#         })

#     # 4. Ambil Gambar Hasil (Plotting)
#     # result.plot() mengembalikan numpy array (BGR)
#     im_array = result.plot() 
#     # Ubah BGR (OpenCV format) ke RGB (PIL format)
#     im_rgb = Image.fromarray(im_array[..., ::-1]) 
    
#     # 5. Ubah Gambar ke Base64 string agar bisa dikirim lewat JSON
#     buffered = io.BytesIO()
#     im_rgb.save(buffered, format="JPEG")
#     img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

#     return {
#         "filename": file.filename, 
#         "detections": detections,
#         "image_base64": img_str # <--- Ini data gambarnya
#     }



# TESTING
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from ultralytics import YOLO
from pathlib import Path
import io, base64

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://deteksi-buah-segar-oub7m15yc-dalveros-projects.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# LOAD MODEL SEKALI SAAT START
# ===============================
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "objectdetection.pt"

print("🔥 Loading YOLO model...")
model = YOLO(str(MODEL_PATH))
model.fuse()
print("✅ Model ready")

@app.get("/")
def root():
    return {"message": "API Deteksi Buah Siap!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    results = model(image)
    result = results[0]

    detections = []
    for box in result.boxes:
        detections.append({
            "class": result.names[int(box.cls)],
            "confidence": float(box.conf),
            "box": box.xyxy.tolist()[0]
        })

    im_array = result.plot()
    im_rgb = Image.fromarray(im_array[..., ::-1])

    buffer = io.BytesIO()
    im_rgb.save(buffer, format="JPEG")

    return {
        "detections": detections,
        "image_base64": base64.b64encode(buffer.getvalue()).decode()
    }
