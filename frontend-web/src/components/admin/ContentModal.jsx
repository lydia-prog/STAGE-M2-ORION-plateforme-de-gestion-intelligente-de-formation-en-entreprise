// src/components/admin/ContentModal.jsx
import { useState, useEffect } from "react";

export default function ContentModal({ isOpen, onClose, onSave, initialData }) {
  const [titre, setTitre] = useState("");
  const [type, setType] = useState("Formation");
  const [statut, setStatut] = useState("Actif");

  useEffect(() => {
    if (initialData) {
      setTitre(initialData.titre || "");
      setType(initialData.type || "Formation");
      setStatut(initialData.statut || "Actif");
    } else {
      setTitre("");
      setType("Formation");
      setStatut("Actif");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre.trim()) return;

    onSave({
      id: initialData ? initialData.id : Date.now(),
      titre,
      type,
      statut,
      evaluations: initialData ? initialData.evaluations : 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-700/80 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-6">
        <div className="flex justify-between items-center border-b border-slate-700 pb-4">
          <h3 className="text-lg font-bold text-white">
            {initialData ? "Modifier le contenu" : "Ajouter un contenu / évaluation"}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
              Titre du module ou de l'évaluation
            </label>
            <input 
              type="text" 
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex: Sécurité et Conformité..."
              required
              className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                Type
              </label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Formation">Formation</option>
                <option value="Évaluation">Évaluation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                Statut
              </label>
              <select 
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                className="w-full bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Actif">Actif</option>
                <option value="Brouillon">Brouillon</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <button 
              type="button" 
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium transition"
            >
              Annuler
            </button>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-lg shadow-blue-600/30"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}