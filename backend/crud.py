from sqlalchemy.orm import Session
import models
import schemas


def create_request(
    db: Session,
    request: schemas.RequestCreate,
    category: str,
    urgency: str
):
    db_request = models.Request(
        name=request.name,
        phone=request.phone,
        category=category,
        description=request.description,
        location=request.location,
        latitude=request.latitude,
        longitude=request.longitude,
        urgency=urgency,
    )

    db.add(db_request)
    db.commit()
    db.refresh(db_request)

    return db_request


def get_requests(db: Session):
    return db.query(models.Request).all()


def create_resource(
    db: Session,
    resource: schemas.ResourceCreate
):
    db_resource = models.Resource(
        name=resource.name,
        phone=resource.phone,
        resource_type=resource.resource_type,
        quantity=resource.quantity,
        description=resource.description,
        location=resource.location,
        latitude=resource.latitude,
        longitude=resource.longitude,
        availability=resource.availability
    )

    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)

    return db_resource


def get_resources(db: Session):
    return db.query(models.Resource).all()


def update_request_status(
    db: Session,
    request_id: int,
    status: str
):
    request = (
        db.query(models.Request)
        .filter(models.Request.id == request_id)
        .first()
    )

    if request is None:
        return None

    request.status = status

    db.commit()
    db.refresh(request)

    return request


def get_pending_requests(db: Session):
    return (
        db.query(models.Request)
        .filter(models.Request.status == "Pending")
        .all()
    )


def get_available_resources(db: Session):
    return (
        db.query(models.Resource)
        .filter(
            models.Resource.availability.like("Available%")
        )
        .all()
    )