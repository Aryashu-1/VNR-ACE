# parser/schema.py

from typing import Dict, Any

# Canonical Resume Schema Template
RESUME_SCHEMA_TEMPLATE: Dict[str, Any] = {
    "meta": {
        "student_id": "",
        "name": "",
        "email": "",
        "phone": "",
        "branch": "",
        "graduation_year": None
    },

    "summary": "",

    "skills": {
        "programming_languages": [],
        "frameworks_tools": [],
        "domains": [],
        "databases": [],
        "other": []
    },

    "education": [
        {
            "degree": "",
            "institution": "",
            "year_start": None,
            "year_end": None,
            "cgpa_or_percentage": None
        }
    ],

    "projects": [
        {
            "title": "",
            "description": "",
            "tech_stack": [],
            "domain": "",
            "outcomes": [],
            "duration": ""
        }
    ],

    "internships": [],

    "experience": [],

    "certifications": [],

    "achievements": [],

    "links": {
        "github": "",
        "linkedin": "",
        "portfolio": ""
    }
}


def validate_resume_schema(data: Dict[str, Any]) -> None:
    """
    Basic structural validation to ensure the LLM returned
    something that matches our expected contract.

    Raises ValueError if structure is invalid.
    """

    required_top_keys = [
        "meta", "summary", "skills", "education",
        "projects", "internships", "experience",
        "certifications", "achievements", "links"
    ]

    for key in required_top_keys:
        if key not in data:
            raise ValueError(f"Missing top-level key: {key}")

    if not isinstance(data["skills"], dict):
        raise ValueError("`skills` must be an object")

    if not isinstance(data["education"], list):
        raise ValueError("`education` must be a list")

    if not isinstance(data["projects"], list):
        raise ValueError("`projects` must be a list")

    if not isinstance(data["links"], dict):
        raise ValueError("`links` must be an object")


def normalize_branch(branch: str) -> str:
    """
    Normalize branch names into canonical forms.
    """
    if not branch:
        return ""

    b = branch.strip().lower()

    mapping = {
        "computer science": "CSE",
        "computer science and engineering": "CSE",
        "cse": "CSE",
        "information technology": "IT",
        "it": "IT",
        "artificial intelligence": "AI",
        "ai": "AI",
        "data science": "DS",
        "ds": "DS",
        "electronics and communication": "ECE",
        "ece": "ECE"
    }

    return mapping.get(b, branch.upper())


def post_process_resume(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Applies normalization rules after LLM parsing.
    """

    # Normalize branch
    meta = data.get("meta", {})
    if "branch" in meta:
        meta["branch"] = normalize_branch(meta.get("branch", ""))

    # Strip whitespace in skills
    skills = data.get("skills", {})
    for k, v in skills.items():
        if isinstance(v, list):
            skills[k] = [s.strip() for s in v if s and s.strip()]

    # Ensure summary is string
    if data.get("summary") is None:
        data["summary"] = ""

    return data
