import os
import tensorflow as tf
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

app = FastAPI()

# Allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "best_model")

print("Loading model from:", model_path)

model = tf.keras.models.load_model(model_path)

print("Model loaded successfully ✅")

# ⚠️ Replace with your real class names
class_names = ["Class1", "Class2", "Class3"]

IMAGE_SIZE = (224, 224)


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize(IMAGE_SIZE)

        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)

        confidence = float(np.max(prediction)) * 100
        predicted_index = int(np.argmax(prediction))
        predicted_class = class_names[predicted_index]

        return {
            "disease": predicted_class,
            "severity": "High" if confidence > 80 else "Medium",
            "health_score": round(confidence),
            "treatment": "Apply recommended fungicide."
        }

    except Exception as e:
        return {"error": str(e)}