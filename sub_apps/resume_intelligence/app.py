# app.py

import os
from parser.pdf_loader import extract_text_from_pdf
from parser.resume_parser import parse_resume
from embeddings.embedder import build_embedding_text, generate_embedding
from storage.postgres import PostgresStore


def process_resume(pdf_path: str, student_id: str) -> str:
    """
    End-to-end pipeline:

    PDF → raw text → structured resume JSON
        → deterministic embedding text → vector
        → store in DB (embeddings + resume_profiles)

    Returns the created profile_id.
    """

    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"Resume not found: {pdf_path}")

    # 1. Extract raw text
    raw_text = extract_text_from_pdf(pdf_path)

    # 2. Parse into canonical schema
    structured = parse_resume(raw_text)

    # Ensure student_id is bound in meta
    structured.setdefault("meta", {})
    structured["meta"]["student_id"] = student_id

    # 3. Build deterministic embedding text
    embed_text = build_embedding_text(structured)

    # 4. Generate embedding
    embedding = generate_embedding(embed_text)

    # 5. Store in Postgres (Supabase)
    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        raise EnvironmentError("DATABASE_URL not set in environment")

    store = PostgresStore(db_url)
    profile_id = store.store_resume_profile(
        student_id=student_id,
        raw_text=raw_text,
        structured_json=structured,
        embedding=embedding
    )

    return profile_id


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="VNR-ACE Resume Intelligence")
    parser.add_argument("--pdf", required=True, help="Path to resume PDF")
    parser.add_argument("--student_id", required=True, help="Student ID")

    args = parser.parse_args()

    pid = process_resume(args.pdf, args.student_id)
    print(f"Resume processed. Profile ID: {pid}")
