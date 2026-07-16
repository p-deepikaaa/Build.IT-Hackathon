from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Request(Base):
    __tablename__ = "requests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=False)
    location = Column(String, nullable=False)
    urgency = Column(String, nullable=False)
    status = Column(String, default="Pending")

    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    # Store AI matching result
    matched_resource = Column(String, nullable=True)
    match_reason = Column(String, nullable=True)


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    resource_type = Column(String, nullable=False)
    quantity = Column(String, nullable=False)
    description = Column(String, nullable=False)
    location = Column(String, nullable=False)
    availability = Column(String, nullable=False)

    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)