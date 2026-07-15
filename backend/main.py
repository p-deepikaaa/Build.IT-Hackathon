from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base
import schemas
import crud

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


@app.post("/requests")
def create_request(
    request: schemas.RequestCreate,
    db: Session = Depends(get_db)
):
    return crud.create_request(db, request)


@app.get("/requests")
def get_requests(db: Session = Depends(get_db)):
    return crud.get_requests(db)

@app.post("/resources")
def create_resource(
    resource: schemas.ResourceCreate,
    db: Session = Depends(get_db)
):
    return crud.create_resource(db, resource)


@app.get("/resources")
def get_resources(db: Session = Depends(get_db)):
    return crud.get_resources(db)

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
        return {"message": "Request not found"}

    return updated_request

@app.get("/requests/pending")
def get_pending_requests(db: Session = Depends(get_db)):
    return crud.get_pending_requests(db)

@app.get("/resources/available")
def get_available_resources(db: Session = Depends(get_db)):
    return crud.get_available_resources(db)

@app.get("/ai-test")
def ai_test():

    text = "Need insulin urgently for a diabetic patient."

    category = classify_request(text)
    priority = detect_priority(text)

    return {
        "category": category,
        "priority": priority
    }