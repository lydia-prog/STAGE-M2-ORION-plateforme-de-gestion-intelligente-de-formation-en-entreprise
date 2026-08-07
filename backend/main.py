from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="SmartForm Backend", version="1.0")

# Configuration CORS pour autoriser ton Front-end à communiquer avec le Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modèles de données
class Module(BaseModel):
    id: str
    title: str
    type: str 
    is_completed: bool

class Course(BaseModel):
    id: str
    title: str
    category: str
    duration: str
    progress: float
    modules: List[Module]

class ProgressUpdate(BaseModel):
    is_completed: bool

# Base de données simulée pour l'espace Apprenant
fake_database = {
    "courses": [
        {
            "id": "1",
            "title": "Sécurité et Conformité",
            "category": "Sécurité",
            "duration": "2h",
            "progress": 33.3,
            "modules": [
                {"id": "m1", "title": "Introduction aux risques professionnels", "type": "video", "is_completed": True},
                {"id": "m2", "title": "Procédures d'urgence en cas d'incendie", "type": "lecture", "is_completed": False},
                {"id": "m3", "title": "Quiz de validation de conformité", "type": "quiz", "is_completed": False}
            ]
        },
        {
            "id": "2",
            "title": "Management Agile",
            "category": "Management",
            "duration": "4h",
            "progress": 0.0,
            "modules": [
                {"id": "m4", "title": "Les fondements du manifeste Agile", "type": "video", "is_completed": False},
                {"id": "m5", "title": "Gestion de projet Scrum et rituels", "type": "lecture", "is_completed": False}
            ]
        }
    ]
}

# Routes API
@app.get("/api/apprenant/courses", response_model=List[Course])
def get_all_courses():
    return fake_database["courses"]

@app.get("/api/apprenant/courses/{course_id}", response_model=Course)
def get_course_detail(course_id: str):
    course = next((c for c in fake_database["courses"] if c["id"] == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Cours introuvable")
    return course

@app.patch("/api/apprenant/courses/{course_id}/modules/{module_id}", response_model=Course)
def update_module_status(course_id: str, module_id: str, payload: ProgressUpdate):
    course = next((c for c in fake_database["courses"] if c["id"] == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Cours introuvable")
    
    module_found = False
    for module in course["modules"]:
        if module["id"] == module_id:
            module["is_completed"] = payload.is_completed
            module_found = True
            break
            
    if not module_found:
        raise HTTPException(status_code=404, detail="Module introuvable")
        
    total_modules = len(course["modules"])
    completed_modules = sum(1 for m in course["modules"] if m["is_completed"])
    course["progress"] = round((completed_modules / total_modules) * 100, 2)
    
    return course