import React, { useState, useEffect } from 'react';

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("Utilisateur non connecté.");
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/certifications/${storedUser.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des certifications");
        return res.json();
      })
      .then((data) => {
        setCertifications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les certifications.");
        setLoading(false);
      });
  }, []);

  const handleDownload = (id) => {
    window.open(`http://127.0.0.1:8000/certifications/${id}/download`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mes Certifications</h1>
          <p className="text-gray-500 mt-1">Retrouvez l'ensemble des certificats validés à la suite de vos formations.</p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          {loading ? (
            <p className="text-gray-500 text-sm">Chargement...</p>
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : certifications.length === 0 ? (
            <p className="text-gray-500 text-sm">Vous n'avez pas encore obtenu de certification.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-5 rounded-xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
                  <div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                      Validé
                    </span>
                    <h3 className="font-semibold text-gray-800 mt-3 mb-1">{cert.intitule}</h3>
                    <p className="text-xs text-gray-500">Obtenu le : {cert.date_obtention}</p>
                  </div>
                  <button
                    onClick={() => handleDownload(cert.id)}
                    className="mt-4 w-full px-4 py-2 bg-slate-900 text-white text-sm rounded-lg font-medium hover:bg-slate-800 transition-colors"
                  >
                    Télécharger le certificat
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}