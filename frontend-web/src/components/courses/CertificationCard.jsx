import React, { useState } from 'react';

export default function Certifications() {
  const [certifications] = useState([
    { id: 1, intitule: "Certificat de Maîtrise de React", date: "12/07/2026" },
    { id: 2, intitule: "Certificat Développeur FastAPI", date: "01/08/2026" }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mes Certifications</h1>
          <p className="text-gray-500 mt-1">Retrouvez l'ensemble des certificats validés à la suite de vos formations.</p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-5 rounded-xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                    Validé
                  </span>
                  <h3 className="font-semibold text-gray-800 mt-3 mb-1">{cert.intitule}</h3>
                  <p className="text-xs text-gray-500">Obtenu le : {cert.date}</p>
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-slate-900 text-white text-sm rounded-lg font-medium hover:bg-slate-800 transition-colors">
                  Télécharger le certificat
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}