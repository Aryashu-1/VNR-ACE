# config.py
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

PARSER_MODEL = os.getenv("PARSER_MODEL", "gemini-2.0-flash")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "models/text-embedding-004")

if not DATABASE_URL:
    raise EnvironmentError("DATABASE_URL not set")

if not GEMINI_API_KEY:
    raise EnvironmentError("GEMINI_API_KEY not set")
