from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import re

from app.ai.services.classifier import classify_request
from app.ai.services.priority_detector import detect_priority
from app.ai.services.matcher import match_resources

from database import engine, get_db
from models import Base
import schemas
import crud
import models


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For hackathon/demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create database tables
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "project": "NeighborGrid",
        "team": "Build.IT Hackathon",
        "backend": "Running Successfully"
    }


# -------------------------
# FALLBACK FUNCTIONS
# -------------------------

def fallback_classification(description: str):
    """
    Used only when Gemini classification fails.
    """
    text = description.lower()

    if any(word in text for word in [
        "insulin", "medicine", "medical",
        "doctor", "hospital", "patient",
        "injured", "injury"
    ]):
        return "Medical"

    if any(word in text for word in [
        "food", "meal", "hungry"
    ]):
        return "Food"

    if any(word in text for word in [
        "water", "drinking"
    ]):
        return "Water"

    if any(word in text for word in [
        "shelter", "home", "house",
        "accommodation"
    ]):
        return "Shelter"

    if any(word in text for word in [
        "transport", "vehicle", "car",
        "ambulance", "ride"
    ]):
        return "Transportation"

    if any(word in text for word in [
        "electricity", "power",
        "generator", "current"
    ]):
        return "Electricity"

    return "General Assistance"


def fallback_priority(description: str):
    """
    Used only when Gemini priority detection fails.
    """
    text = description.lower()

    critical_words = [
        "urgent",
        "urgently",
        "emergency",
        "critical",
        "immediately",
        "insulin",
        "life threatening",
        "unconscious"
    ]

    high_words = [
        "important",
        "as soon as possible",
        "asap",
        "medicine",
        "medical"
    ]

    if any(word in text for word in critical_words):
        return "Critical"

    if any(word in text for word in high_words):
        return "High"

    return "Medium"


# -------------------------
# REQUESTS
# -------------------------

@app.post("/requests")
def create_request(
    request: schemas.RequestCreate,
    db: Session = Depends(get_db)
):

    # -------------------------
    # AI CLASSIFICATION
    # -------------------------

    try:
        classification = classify_request(
            request.description
        )

        category = classification.get(
            "category",
            "General Assistance"
        )

    except Exception as error:
        print(
            "Gemini classification failed. "
            "Using fallback:",
            error
        )

        category = fallback_classification(
            request.description
        )


    # -------------------------
    # AI PRIORITY DETECTION
    # -------------------------

    try:
        priority = detect_priority(
            request.description
        )

        urgency = priority.get(
            "priority",
            "Medium"
        )

    except Exception as error:
        print(
            "Gemini priority detection failed. "
            "Using fallback:",
            error
        )

        urgency = fallback_priority(
            request.description
        )


    # -------------------------
    # SAVE REQUEST
    # -------------------------

    return crud.create_request(
        db=db,
        request=request,
        category=category,
        urgency=urgency
    )


@app.get("/requests")
def get_requests(
    db: Session = Depends(get_db)
):
    return crud.get_requests(db)


@app.get("/requests/pending")
def get_pending_requests(
    db: Session = Depends(get_db)
):
    return crud.get_pending_requests(db)


@app.patch("/requests/{request_id}")
def update_request_status(
    request_id: int,
    status_update: schemas.StatusUpdate,
    db: Session = Depends(get_db)
):

    updated_request = crud.update_request_status(
        db,
        request_id,
        status_update.status
    )

    if updated_request is None:
        return {
            "message": "Request not found"
        }

    return updated_request


# -------------------------
# RESOURCES
# -------------------------

@app.post("/resources")
def create_resource(
    resource: schemas.ResourceCreate,
    db: Session = Depends(get_db)
):

    return crud.create_resource(
        db,
        resource
    )


@app.get("/resources")
def get_resources(
    db: Session = Depends(get_db)
):

    return crud.get_resources(db)


@app.get("/resources/available")
def get_available_resources(
    db: Session = Depends(get_db)
):

    return crud.get_available_resources(db)


# -------------------------
# AI TEST
# -------------------------

@app.get("/ai-test")
def ai_test():

    text = "Need insulin urgently for a diabetic patient."

    try:

        category = classify_request(text)
        priority = detect_priority(text)

        return {
            "ai_status": "working",
            "category": category,
            "priority": priority
        }

    except Exception as error:

        return {
            "ai_status": "fallback",
            "category": fallback_classification(text),
            "priority": fallback_priority(text),
            "error": str(error)
        }


# -------------------------
# AI RESOURCE MATCHING
# -------------------------

@app.get("/match/{request_id}")
def match_request_with_resource(
    request_id: int,
    db: Session = Depends(get_db)
):

    # Get request
    request = (
        db.query(models.Request)
        .filter(
            models.Request.id == request_id
        )
        .first()
    )

    if request is None:
        return {
            "message": "Request not found"
        }


    # Get available resources
    resources = crud.get_available_resources(db)

    if not resources:
        return {
            "request_id": request.id,
            "request": request.description,
            "status": request.status,
            "message": "No available resources found"
        }


    # Convert resources into strings for Gemini
    resource_list = [
        f"ID: {resource.id}, "
        f"Type: {resource.resource_type}, "
        f"Quantity: {resource.quantity}, "
        f"Description: {resource.description}, "
        f"Location: {resource.location}, "
        f"Availability: {resource.availability}"
        for resource in resources
    ]


    # -------------------------
    # AI MATCHING
    # -------------------------

    try:

        match = match_resources(
            request=request.description,
            resources=resource_list
        )

    except Exception as error:

        print(
            "Gemini matching failed:",
            error
        )

        return {
            "request_id": request.id,
            "request": request.description,
            "status": request.status,
            "message": (
                "Request submitted successfully, "
                "but AI matching is temporarily unavailable."
            )
        }


    matched_resource_text = match.get(
        "matched_resource"
    )

    match_reason = match.get(
        "reason"
    )


    # -------------------------
    # VALIDATE AI MATCH
    # -------------------------

    if not matched_resource_text:

        return {
            "request_id": request.id,
            "request": request.description,
            "status": request.status,
            "message": "No suitable resource match found"
        }


    # Extract resource ID
    matched_resource_id = None

    id_match = re.search(
        r"ID:\s*(\d+)",
        matched_resource_text,
        re.IGNORECASE
    )

    if id_match:
        matched_resource_id = int(
            id_match.group(1)
        )


    # -------------------------
    # RESERVE RESOURCE
    # -------------------------

    if matched_resource_id is not None:

        matched_resource = (
            db.query(models.Resource)
            .filter(
                models.Resource.id
                == matched_resource_id
            )
            .first()
        )

        if matched_resource:

            matched_resource.availability = (
                "Reserved"
            )

            request.matched_resource = (
                matched_resource_text
            )

            request.match_reason = (
                match_reason
            )

            request.status = "Matched"

            db.commit()
            db.refresh(request)

        else:

            return {
                "request_id": request.id,
                "request": request.description,
                "status": request.status,
                "message": (
                    "Matched resource was not "
                    "found in the database"
                )
            }

    else:

        return {
            "request_id": request.id,
            "request": request.description,
            "status": request.status,
            "message": (
                "AI returned a match but the "
                "resource ID could not be identified"
            )
        }


    # -------------------------
    # RETURN MATCH
    # -------------------------

    return {
        "request_id": request.id,
        "request": request.description,
        "status": request.status,
        "match": {
            "matched_resource":
                request.matched_resource,

            "reason":
                request.match_reason
        }
    }