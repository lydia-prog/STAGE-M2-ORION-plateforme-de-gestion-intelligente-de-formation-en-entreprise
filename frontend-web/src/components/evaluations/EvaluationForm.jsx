import { useState } from "react";

export default function EvaluationForm({ formations, onSubmit }) {
  const [titre, setTitre] = useState("");
  const [formationId, setFormationId] = useState("");
  const [seuil, setSeuil] = useState(50);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!titre || !formationId) return;
    setSubmitting(true);
    try {
      await onSubmit({
        titre,
        formation_id: Number(formationId),
        seuil_reussite: Number(seuil),
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg space-y-4 rounded-lg border border-slate-200 bg-white p-6"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Titre de l'évaluation
        </label>
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          placeholder="Ex : Quiz sécurité informatique"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Formation liée
        </label>
        <select
          value={formationId}
          onChange={(e) => setFormationId(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          required
        >
          <option value="">Sélectionner une formation</option>
          {formations.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Seuil de réussite (%)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={seuil}
          onChange={(e) => setSeuil(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {submitting ? "Enregistrement..." : "Enregistrer l'évaluation"}
      </button>
    </form>
  );
}