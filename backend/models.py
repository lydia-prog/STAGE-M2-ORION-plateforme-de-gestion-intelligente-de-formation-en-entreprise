from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Date, ForeignKey
from sqlalchemy.dialects.mysql import CHAR
from database import Base
import uuid


def gen_uuid():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nom = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="apprenant")  # 👈 Ajouté ici ("apprenant", "admin", "rh")


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    intitule = Column(String(255), nullable=False)
    date_obtention = Column(Date, nullable=False)
    fichier_pdf = Column(String(255), nullable=True)


class Evaluation(Base):
    __tablename__ = "evaluation"

    id = Column(CHAR(36), primary_key=True, default=gen_uuid)
    id_formation = Column(CHAR(36), nullable=False)
    titre = Column(String(255), nullable=False)
    type_evaluation = Column(String(20), nullable=False)
    note_max = Column(Integer, nullable=False, default=20)
    date_limite = Column(DateTime, nullable=True)
    cree_par = Column(Integer, ForeignKey("users.id"), nullable=False)
    date_creation = Column(DateTime, nullable=False, server_default="CURRENT_TIMESTAMP")


class QuestionEvaluation(Base):
    __tablename__ = "question_evaluation"

    id = Column(CHAR(36), primary_key=True, default=gen_uuid)
    id_evaluation = Column(CHAR(36), ForeignKey("evaluation.id", ondelete="CASCADE"), nullable=False)
    enonce = Column(Text, nullable=False)
    type_question = Column(String(20), nullable=False)
    points = Column(Integer, nullable=False, default=1)


class OptionQuestion(Base):
    __tablename__ = "option_question"

    id = Column(CHAR(36), primary_key=True, default=gen_uuid)
    id_question = Column(CHAR(36), ForeignKey("question_evaluation.id", ondelete="CASCADE"), nullable=False)
    texte = Column(String(255), nullable=False)
    est_correcte = Column(Boolean, nullable=False, default=False)


class ResultatEvaluation(Base):
    __tablename__ = "resultat_evaluation"

    id = Column(CHAR(36), primary_key=True, default=gen_uuid)
    id_utilisateur = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    id_evaluation = Column(CHAR(36), ForeignKey("evaluation.id", ondelete="CASCADE"), nullable=False)
    note_obtenue = Column(Integer, nullable=True)
    statut = Column(String(20), nullable=False, default="a_faire")
    date_debut = Column(DateTime, nullable=True)
    date_soumission = Column(DateTime, nullable=True)


class ReponseApprenant(Base):
    __tablename__ = "reponse_apprenant"

    id = Column(CHAR(36), primary_key=True, default=gen_uuid)
    id_resultat = Column(CHAR(36), ForeignKey("resultat_evaluation.id", ondelete="CASCADE"), nullable=False)
    id_question = Column(CHAR(36), ForeignKey("question_evaluation.id", ondelete="CASCADE"), nullable=False)
    id_option_choisie = Column(CHAR(36), ForeignKey("option_question.id"), nullable=True)
    reponse_texte = Column(Text, nullable=True)
    est_correcte = Column(Boolean, nullable=True)


class Formation(Base):
    __tablename__ = "formation"

    id = Column(CHAR(36), primary_key=True, default=gen_uuid)
    titre = Column(String(255), nullable=False)
    categorie = Column(String(100), nullable=False)
    duree = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)
    date_creation = Column(DateTime, nullable=False, server_default="CURRENT_TIMESTAMP")


class InscriptionFormation(Base):
    __tablename__ = "inscription_formation"

    id = Column(CHAR(36), primary_key=True, default=gen_uuid)
    id_utilisateur = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    id_formation = Column(CHAR(36), ForeignKey("formation.id", ondelete="CASCADE"), nullable=False)
    progression = Column(Integer, nullable=False, default=0)
    date_inscription = Column(DateTime, nullable=False, server_default="CURRENT_TIMESTAMP")