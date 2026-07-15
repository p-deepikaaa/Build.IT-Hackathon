from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base
import schemas
import crud

app = FastAPI()

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