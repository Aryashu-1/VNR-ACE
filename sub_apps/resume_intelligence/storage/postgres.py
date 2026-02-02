# storage/postgres.py

import uuid
import json
import hashlib
from datetime import datetime
import psycopg2
from psycopg2.extras import Json


class PostgresStore:
    def __init__(self, db_url: str):
        self.db_url = db_url

    def connect(self):
        return psycopg2.connect(self.db_url)

    def store_resume_profile(
        self,
        student_id: str,
        raw_text: str,
        structured_json: dict,
        embedding: list,
        model_name: str = "text-embedding-3-large",
        resume_version: int = 1
    ) -> str:
        """
        Stores:
        1. Embedding in `embeddings`
        2. Resume profile in `resume_profiles`

        Returns the created profile_id.
        """

        profile_id = str(uuid.uuid4())
        embedding_id = str(uuid.uuid4())

        # Deterministic text hash (for future cache/migration logic)
        embedding_source = json.dumps(structured_json, sort_keys=True)
        content_hash = hashlib.sha256(embedding_source.encode()).hexdigest()

        conn = self.connect()
        cur = conn.cursor()

        try:
            # Insert embedding
            cur.execute("""
                INSERT INTO embeddings
                (embedding_id, owner_type, owner_id, model, content_hash, vector, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (
                embedding_id,
                "resume_profile",
                profile_id,
                model_name,
                content_hash,
                embedding,
                datetime.utcnow()
            ))

            # Insert resume profile
            cur.execute("""
                INSERT INTO resume_profiles
                (profile_id, student_id, resume_version, raw_text, structured_json, embedding_id, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (
                profile_id,
                student_id,
                resume_version,
                raw_text,
                Json(structured_json),
                embedding_id,
                datetime.utcnow()
            ))

            conn.commit()
            return profile_id

        except Exception:
            conn.rollback()
            raise

        finally:
            cur.close()
            conn.close()
