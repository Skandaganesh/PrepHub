from fastapi import APIRouter, HTTPException, Depends
from models.user import UpdateUser
from core.security import hash_password, verify_token
from database import init_db
from motor.motor_asyncio import AsyncIOMotorCollection
from pymongo.collection import Collection

router = APIRouter()

# ⬇️ Get Users Collection
async def get_users_collection() -> AsyncIOMotorCollection:
    await init_db()  # Ensure this function is awaitable
    from database import users_collection  # Import dynamically after DB init
    return users_collection


# ⬇️ Update User
@router.put("/update")
async def update_user(
    update_data: UpdateUser, 
    current_user: str = Depends(verify_token), 
    users: Collection = Depends(get_users_collection)
):
    user = await users.find_one({"username": current_user})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # ⬇️ Preserve existing values if fields are not provided
    updated_user = {
        "name": update_data.name if update_data.name else user["name"],
        "year": update_data.year if update_data.year else user["year"],
        "password": hash_password(update_data.password) if update_data.password else user["password"],
    }

    users.update_one({"username": current_user}, {"$set": updated_user})

    return {"message": "User updated successfully", "updated_data": updated_user}


# ⬇️ Delete User
@router.delete("/delete")
async def delete_user(
    current_user: str = Depends(verify_token),
    users: Collection = Depends(get_users_collection)
):
    user = await users.find_one({"username": current_user})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    await user.delete_one({"username": current_user})

    return {"message": "User deleted successfully"}
