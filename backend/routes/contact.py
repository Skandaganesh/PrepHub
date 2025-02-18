from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from datetime import datetime
from database import init_db
from pymongo.collection import Collection
from models.contact import ContactForm

router = APIRouter()

# ⬇️ Get Contact Collection
async def get_contact_collection() -> Collection:
    await init_db()
    from database import contact_collection  # Import dynamically after DB init
    return contact_collection

# ⬇️ Pydantic Model for Contact Form
# Using the ContactForm from models.contact

# ⬇️ Contact Us Route
@router.post("/contact")
async def contact_us(contact_data: ContactForm, contact_collection: Collection = Depends(get_contact_collection)):
    contact_entry = {
        "name": contact_data.name,
        "email": contact_data.email,
        "message": contact_data.message,
        "timestamp": datetime.utcnow()  # Store submission time
    }

    await contact_collection.insert_one(contact_entry)
    
    return {"message": "Your query has been received. We will get back to you soon!"}
