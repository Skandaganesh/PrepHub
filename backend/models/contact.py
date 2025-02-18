from pydantic import BaseModel, EmailStr
from typing import Optional

class ContactForm(BaseModel):
    name: str
    email: EmailStr  # Ensures valid email format
    message: str


model_config = {
        "arbitrary_types_allowed": True
    }
