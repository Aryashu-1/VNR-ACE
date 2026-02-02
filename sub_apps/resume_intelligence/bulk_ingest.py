# bulk_ingest.py

import os
import time
from app import process_resume

RESUME_DIR = r"C:\Users\Work\code\VNR-ACE\sub_apps\resume_intelligence\resumes"


def bulk_ingest(resume_dir: str):
    files = [f for f in os.listdir(resume_dir) if f.lower().endswith(".pdf")]

    print(f"Found {len(files)} resume files\n")

    success = 0
    failed = 0

    for idx, fname in enumerate(files, start=1):
        student_id = os.path.splitext(fname)[0]
        path = os.path.join(resume_dir, fname)

        print(f"[{idx}/{len(files)}] Processing {fname} → {student_id}")

        try:
            profile_id = process_resume(path, student_id)
            print(f"   ✔ Stored as profile {profile_id}\n")
            success += 1
        except Exception as e:
            print(f"   ✖ Failed: {e}\n")
            failed += 1
        
        time.sleep(2)

    print("========== SUMMARY ==========")
    print(f"Success: {success}")
    print(f"Failed : {failed}")


if __name__ == "__main__":
    bulk_ingest(RESUME_DIR)
