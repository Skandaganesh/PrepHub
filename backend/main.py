from fastapi import FastAPI
from routes.auth import router as auth_router
from routes.users import router as users_router
from routes.contact import router as contacts_router
app = FastAPI()


app.include_router(auth_router,prefix="/auth", tags = ["Authentication"])
app.include_router(users_router, prefix="/users", tags = ["Users"])
app.include_router(contacts_router, tags = ["Contacts"])



@app.get("/")
def welcome():
    return {"welcome to Prephub"}
