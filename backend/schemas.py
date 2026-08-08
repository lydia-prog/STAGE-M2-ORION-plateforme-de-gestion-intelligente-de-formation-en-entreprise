from pydantic import BaseModel, EmailStr
from datetime import date

class UserCreate(BaseModel):
    nom: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    nom: str
    email: str

    class Config:
        from_attributes = True

class CertificationOut(BaseModel):
    id: int
    intitule: str
    date_obtention: date

    class Config:
        from_attributes = True

class EvaluationOut(BaseModel):
    id: str
    titre: str
    note: str
    statut: str

class CourseOut(BaseModel):
    id: str
    title: str
    category: str
    progress: int
    duration: str