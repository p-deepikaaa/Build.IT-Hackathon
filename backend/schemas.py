from pydantic import BaseModel
from typing import Optional


class RequestCreate(BaseModel):
    name: str
    phone: str
    description: str
    location: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class ResourceCreate(BaseModel):
    name: str
    phone: str
    resource_type: str
    quantity: str
    description: str
    location: str
    availability: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class StatusUpdate(BaseModel):
    status: str