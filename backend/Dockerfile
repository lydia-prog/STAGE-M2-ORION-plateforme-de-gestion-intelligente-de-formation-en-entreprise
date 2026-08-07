# Utiliser une image officielle Python légère
FROM python:3.11-slim

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Installer les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code du backend
COPY . .

# Exposer le port sur lequel tourne FastAPI
EXPOSE 8000

# Commande pour lancer le serveur
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]