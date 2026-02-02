
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

with open("available_models.txt", "w", encoding="utf-8") as f:
    try:
        for m in client.models.list():
            f.write(f"{m.name}\n")
        print("Models written to available_models.txt")
    except Exception as e:
        print(f"Error listing models: {e}")
