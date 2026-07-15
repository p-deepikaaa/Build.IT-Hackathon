from sqlalchemy.orm import Session
import models
import schemas


def create_request(db: Session, request: schemas.RequestCreate):
    db_request = models.Request(
        name=request.name,
        phone=request.phone,
        category=request.category,
        description=request.description,
        location=request.location,
        urgency=request.urgency,
    )

    db.add(db_request)
    db.commit()
    db.refresh(db_request)

    return db_request