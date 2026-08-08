from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import bcrypt
import os
from datetime import datetime
from pydantic import BaseModel

from database import engine, get_db
import models
import schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SmartForm - Inscription & Connexion Apprenant")

# --- CONFIGURATION CORS POUR REACT ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fonctions de hachage
def hash_password(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# --- 1. ROUTE D'INSCRIPTION ---
@app.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register_apprenant(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Cet email est déjà utilisé."
        )

    hashed_pwd = hash_password(user.password)

    new_user = models.User(
        nom=user.nom,
        email=user.email,
        hashed_password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

# --- 2. ROUTE DE CONNEXION ---
@app.post("/login")
def login_apprenant(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect."
        )

    return {
        "message": "Connexion réussie !",
        "user": {
            "id": user.id,
            "nom": user.nom,
            "email": user.email
        }
    }

# --- 3. ROUTE : LISTE DES CERTIFICATIONS D'UN USER ---
@app.get("/certifications/{user_id}", response_model=list[schemas.CertificationOut])
def get_certifications(user_id: int, db: Session = Depends(get_db)):
    certifications = db.query(models.Certification).filter(
        models.Certification.user_id == user_id
    ).all()
    return certifications

# --- 4. ROUTE : TÉLÉCHARGER UN CERTIFICAT ---
@app.get("/certifications/{cert_id}/download")
def download_certification(cert_id: int, db: Session = Depends(get_db)):
    cert = db.query(models.Certification).filter(
        models.Certification.id == cert_id
    ).first()

    if not cert or not cert.fichier_pdf:
        raise HTTPException(status_code=404, detail="Certificat introuvable")

    file_path = os.path.join("certificats", cert.fichier_pdf)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Fichier introuvable sur le serveur")

    return FileResponse(file_path, media_type="application/pdf", filename=cert.fichier_pdf)

# --- 5. ROUTE : LISTE DES ÉVALUATIONS D'UN USER ---
@app.get("/evaluations/{user_id}", response_model=list[schemas.EvaluationOut])
def get_evaluations(user_id: int, db: Session = Depends(get_db)):
    resultats = (
        db.query(models.ResultatEvaluation, models.Evaluation)
        .join(models.Evaluation, models.ResultatEvaluation.id_evaluation == models.Evaluation.id)
        .filter(models.ResultatEvaluation.id_utilisateur == user_id)
        .all()
    )

    output = []
    for resultat, evaluation in resultats:
        if resultat.statut == "termine":
            statut_label = "Terminé"
            note_label = f"{resultat.note_obtenue}/{evaluation.note_max}" if resultat.note_obtenue is not None else "Non noté"
        else:
            statut_label = "À faire"
            note_label = "En attente"

        output.append({
            "id": evaluation.id,
            "titre": evaluation.titre,
            "note": note_label,
            "statut": statut_label,
        })

    return output

# --- 6. ROUTE : CATALOGUE DE FORMATIONS (sans progression) ---
@app.get("/formations", response_model=list[schemas.CourseOut])
def get_formations(db: Session = Depends(get_db)):
    formations = db.query(models.Formation).all()
    return [
        {
            "id": f.id,
            "title": f.titre,
            "category": f.categorie,
            "progress": 0,
            "duration": f.duree,
        }
        for f in formations
    ]

# --- 7. ROUTE : CATALOGUE DE FORMATIONS AVEC PROGRESSION D'UN USER ---
@app.get("/formations/user/{user_id}", response_model=list[schemas.CourseOut])
def get_formations_with_progress(user_id: int, db: Session = Depends(get_db)):
    formations = db.query(models.Formation).all()
    inscriptions = {
        i.id_formation: i.progression
        for i in db.query(models.InscriptionFormation)
        .filter(models.InscriptionFormation.id_utilisateur == user_id)
        .all()
    }

    return [
        {
            "id": f.id,
            "title": f.titre,
            "category": f.categorie,
            "progress": inscriptions.get(f.id, 0),
            "duration": f.duree,
        }
        for f in formations
    ]


# ====================================================
# 8. ROUTE D'INSCRIPTION À UNE FORMATION (AJOUTÉE)
# ====================================================
class InscriptionRequest(BaseModel):
    user_id: int

@app.post("/formations/{formation_id}/inscrire")
def inscrire_formation(formation_id: str, req: InscriptionRequest, db: Session = Depends(get_db)):
    """
    Inscription d'un utilisateur à une formation.
    Vérifie l'existence de la formation et de l'utilisateur,
    évite les doublons et enregistre l'inscription.
    """
    # Vérifier que la formation existe
    formation = db.query(models.Formation).filter(models.Formation.id == formation_id).first()
    if not formation:
        raise HTTPException(status_code=404, detail="Formation non trouvée")

    # Vérifier que l'utilisateur existe
    user = db.query(models.User).filter(models.User.id == req.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    # Vérifier qu'il n'est pas déjà inscrit
    existing = db.query(models.InscriptionFormation).filter(
        models.InscriptionFormation.id_utilisateur == req.user_id,
        models.InscriptionFormation.id_formation == formation_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Déjà inscrit à cette formation")

    # Créer l'inscription
    new_inscription = models.InscriptionFormation(
        id_utilisateur=req.user_id,
        id_formation=formation_id,
        progression=0,
        # Si votre modèle a une colonne date_inscription, ajoutez :
        # date_inscription=datetime.now()
    )
    db.add(new_inscription)
    db.commit()
    db.refresh(new_inscription)

    return {"message": "Inscription réussie !"}