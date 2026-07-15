from pydantic import BaseModel


class RequestCreate(BaseModel):
    name: str
    phone: str
    category: str
    description: str
    location: str
    urgency: str