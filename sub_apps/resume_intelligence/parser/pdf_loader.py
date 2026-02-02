# parser/pdf_loader.py

import pdfplumber
from pathlib import Path


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extracts raw text from a PDF resume.

    Returns a single string containing all pages.
    Raises FileNotFoundError if the file does not exist.
    """

    path = Path(pdf_path)

    if not path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    pages_text = []

    with pdfplumber.open(str(path)) as pdf:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            text = text.replace("\x00", "").strip()
            if text:
                pages_text.append(text)

    combined = "\n\n".join(pages_text)

    if not combined.strip():
        raise ValueError("No extractable text found in PDF")

    return combined
