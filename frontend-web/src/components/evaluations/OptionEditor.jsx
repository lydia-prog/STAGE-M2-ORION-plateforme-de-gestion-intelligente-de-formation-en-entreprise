import { useState } from "react";

export default function OptionEditor({ options, onAdd, onToggleCorrect, onRemove }) {
  const [texte, setTexte] = useState("");

  function handleAdd() {
    if (!texte.trim()) return;
    onAdd(texte.trim());
    setTexte("");
  }

  return (
    <div className="mt-2 space-y-2 rounded-md bg-slate-50 p-3">
      {options.length === 0 && (
        <p className="text-xs text-slate-400">Aucune option pour l'instant.</p>
      )}

      {options.map((opt) => (
        <div key={opt.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={opt.est_correcte}
            onChange={() => onToggleCorrect(opt.id)}
            title="Marquer comme bonne réponse"
          />
          <span className="flex-1 text-sm text-slate-700">{opt.texte}</span>
          <button
            onClick={() => onRemove(opt.id)}
            className="text-xs text-red-500 hover:underline"
          >
            Retirer
          </button>
        </div>
      ))}

      <div className="flex gap-2 pt-1">
        <input
          type="text"
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="Nouvelle option"
          className="flex-1 rounded-md border border-slate-300 px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="rounded-md bg-slate-200 px-3 py-1 text-sm text-slate-700 hover:bg-slate-300"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}