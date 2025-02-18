import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

mongo_url = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "prephub")

client = AsyncIOMotorClient(mongo_url)
db = client[DB_NAME]


users_collection = db["users"]
contact_collection = db["contacts"]

async def init_db():
    """Initialize database (if needed in the future)."""
    pass  
