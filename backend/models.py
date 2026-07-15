from sqlalchemy import Column, Integer, String
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