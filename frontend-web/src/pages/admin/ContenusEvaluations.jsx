// src/pages/admin/ContenusEvaluations.jsx
import { useState } from "react";
import ContentModal from "../../components/admin/ContentModal";

export default function ContenusEvaluations() {
  const [contentSearchTerm, setContentSearchTerm] = useState("");
  
  // États pour le Modal d'Ajout / Édition
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);

  // Liste initiale des contenus et évaluations
  const [contenus, setContenus] = useState([
    { id: 1, titre: "Sécurité et Conformité des Postes", type: "Formation", statut: "Actif", evaluations: 12 },
    { id: 2, titre: "Évaluation Trimestrielle - Compétences Techniques", type: "Évaluation", statut: "Brouillon", evaluations: 0 },
    { id: 3, titre: "Sensibilisation aux Risques Majeurs", type: "Formation", statut: "Actif", evaluations: 28 },
  ]);

  // Gestion de l'enregistrement (Ajout ou Modification)
  const handleSaveContent = (contentData) => {
    if (editingContent) {
      setContenus(contenus.map((c) => (c.id === contentData.id ? contentData : c)));
    } else {
      setContenus([contentData, ...contenus]);
    }
    setEditingContent(null);
  };

  // Suppression d'un contenu ou évaluation
  const handleDeleteContent = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      setContenus(contenus.filter((c) => c.id !== id));
    }
  };

  // Filtrage par recherche
  const filteredContenus = contenus.filter((c) =>
    c.titre.toLowerCase().includes(contentSearchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(contentSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Gestion des Contenus & Évaluations</h2>
            <p className="text-xs text-slate-400 mt-1">Créez, modifiez et suivez les modules de formation et tests d'évaluation sur la même interface.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input 
              type="text" 
              placeholder="Filtrer les contenus..." 
              value={contentSearchTerm}
              onChange={(e) => setContentSearchTerm(e.target.value)}
              className="bg-slate-700/60 border border-slate-600 px-4 py-2 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={() => {
                setEditingContent(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-blue-600/30 whitespace-nowrap"
            >
              + Nouveau
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4">ID</th>
                <th className="p-4">Titre du module</th>
                <th className="p-4">Type</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Évaluations validées</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-sm">
              {filteredContenus.length > 0 ? (
                filteredContenus.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-700/20 transition">
                    <td className="p-4 text-slate-400">#{item.id}</td>
                    <td className="p-4 font-medium">{item.titre}</td>
                    <td className="p-4 text-slate-300">
                      <span className="bg-slate-700/50 px-2.5 py-1 rounded-md text-xs border border-slate-600">
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        item.statut === "Actif" 
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}>
                        {item.statut}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300 font-semibold">{item.evaluations}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => {
                          setEditingContent(item);
                          setIsModalOpen(true);
                        }}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-md text-xs transition"
                      >
                        Éditer
                      </button>
                      <button 
                        onClick={() => handleDeleteContent(item.id)}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-md text-xs transition"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">
                    Aucun contenu trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL AJOUT / ÉDITION */}
      <ContentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContent}
        initialData={editingContent}
      />
    </div>
  );
}