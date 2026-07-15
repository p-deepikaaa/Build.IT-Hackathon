from pydantic import BaseModel


class RequestCreate(BaseModel):
    name: str
    phone: str
    category: str
    description: str
    location: str
    urgency: str

class ResourceCreate(BaseModel):
    name: str
    phone: str
    resource_type: str
    quantity: str
    description: str
    location: str
    availability: str

class StatusUpdate(BaseModel):
    status: str