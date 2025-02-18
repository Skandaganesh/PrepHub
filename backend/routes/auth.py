from fastapi import APIRouter, HTTPException, Depends, Form
from models.user import User, LoginUser
from core.security import hash_password, verify_password, create_access_token
from database import init_db
from fastapi.responses import JSONResponse
from datetime import timedelta
from motor.motor_asyncio import AsyncIOMotorCollection as Collection

router = APIRouter()

# ⬇️ Get Users Collection
async def get_users_collection() -> Collection:
    await init_db()
    from database import users_collection  # Import dynamically after DB init
    return users_collection

# ⬇️ User Registration
@router.post("/register")
async def register_user(user_data: User, users: Collection = Depends(get_users_collection)):
    existing_user = await users.find_one({"username": user_data.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Hash password before saving
    user_data.password = hash_password(user_data.password)
    await users.insert_one(user_data.dict())

    return JSONResponse(content={"message": "User registered successfully"})



# ⬇️ User Login
@router.post("/login")
async def login(username: str = Form(...), password: str = Form(...), users: Collection = Depends(get_users_collection)):
    user = await users.find_one({"username": username})
    
    if not user or not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate JWT including username, name, and year
    access_token = create_access_token({
        "sub": user["username"],
        "name": user["name"],
        "year": user["year"]
    }, expires_delta=timedelta(minutes=30))

    return {"access_token": access_token, "token_type": "bearer"}

