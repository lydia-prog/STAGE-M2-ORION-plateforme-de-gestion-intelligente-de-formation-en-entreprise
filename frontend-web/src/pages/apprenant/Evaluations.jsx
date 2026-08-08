import React, { useState, useEffect } from 'react';
import EvaluationCard from '../../components/courses/EvaluationCard';

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("Utilisateur non connecté.");
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/evaluations/${storedUser.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des évaluations");
        return res.json();
      })
      .then((data) => {
        setEvaluations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les évaluations.");
        setLoading(false);
      });
  }, []);

  const handleStart = (id) => {
    console.log("Lancer l'évaluation avec l'ID :", id);
    // Logique de redirection vers le quiz interactif
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête de la page */}
        <header className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Mes Évaluations</h1>
            <p className="text-sm text-gray-500 mt-1">Passez vos examens de fin de module et suivez vos résultats en direct.</p>
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold self-start sm:self-auto">
            <span>{evaluations.length} évaluation(s)</span>
          </div>
        </header>

        {/* Liste des évaluations */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm">Chargement...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          ) : evaluations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm">Aucune évaluation disponible pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {evaluations.map((ev) => (
                <EvaluationCard
                  key={ev.id}
                  evaluation={ev}
                  onStart={handleStart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}