from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    username : str
    password : str
    name : str
    year : int

class LoginUser(BaseModel):
    username : str
    password : str

class showUser(BaseModel):
    username : str
    name : str
    year : int 

class UpdateUser(BaseModel):
    username : Optional[str]    
    password : Optional[str]
    name : Optional[str]
    year : Optional[int]


model_config = {
        "arbitrary_types_allowed": True
    }

