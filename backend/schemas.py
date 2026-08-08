from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional

class UserCreate(BaseModel):
    nom: str
    email: EmailStr
    password: str
    role: Optional[str] = "apprenant"  # 👈 Ajouté ici pour recevoir le choix du formulaire

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    nom: str
    email: str
    role: str  # 👈 Ajouté ici pour que FastAPI renvoie le rôle lors de la connexion

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