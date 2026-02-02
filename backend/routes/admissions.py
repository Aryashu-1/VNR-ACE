from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from core.auth import get_current_user
from core.db import get_db
from ace_graphs.admissions_graph import admissions_graph


router = APIRouter(prefix="/admissions", tags=["Admissions"])


@router.post("/chat")
async def admissions_chat(
    body: dict,
    current_user=Depends(get_current_user),   # gets user + role
    db: AsyncSession = Depends(get_db)
):
    message = body.get("message")
    if not message:
        raise HTTPException(status_code=400, detail="Message required")

    # Prepare graph state
    initial_state = {
        "user_id": current_user.id,
        "role_id": current_user.role_id,
        "message": message,
        "reply": None,
        "route": None,
    }

    # Run graph
    result = await admissions_graph.ainvoke(initial_state)

    return {
        "reply": result.get("reply"),
        "route": result.get("route")   # optional debug info
    }
