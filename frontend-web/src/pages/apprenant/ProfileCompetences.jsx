import React, { useState } from 'react';
import SkillCard from '../../components/courses/SkillCard';

export default function ProfileCompetences() {
  // Données de compétences (qui se mettent à jour automatiquement quand un quiz est réussi)
  const [competences] = useState([
    { id: 1, nom: "Développement Front-End (React)", niveau: "Intermédiaire", progression: 75 },
    { id: 2, nom: "Architecture Back-End (FastAPI)", niveau: "Débutant", progression: 40 },
    { id: 3, nom: "Gestion de version (Git & GitHub)", niveau: "Avancé", progression: 90 },
  ]);

  const apprenantInfo = {
    nom: "Lydia",
    niveauEtude: "Master 2",
    statut: "En formation active",
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête / Infos Apprenant */}
        <header className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              {apprenantInfo.nom.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profil de {apprenantInfo.nom}</h1>
              <p className="text-sm text-gray-500">{apprenantInfo.niveauEtude} • <span className="text-emerald-600 font-medium">{apprenantInfo.statut}</span></p>
            </div>
          </div>
          <div className="bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-emerald-100">
            Mise à jour automatique active ⚡
          </div>
        </header>

        {/* Section Compétences */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800">Mes Compétences Validées</h2>
            <p className="text-xs text-gray-400 mt-0.5">Ces jauges augmentent automatiquement lorsque vous réussissez des quiz et des cours.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competences.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}