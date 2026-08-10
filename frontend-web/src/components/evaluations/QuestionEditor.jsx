import { useState } from "react";
import OptionEditor from "./OptionEditor";

const TYPES = [
  { value: "qcm", label: "QCM" },
  { value: "vrai_faux", label: "Vrai / Faux" },
  { value: "texte_libre", label: "Texte libre" },
];

export default function QuestionEditor({
  questions,
  onAddQuestion,
  onRemoveQuestion,
  onAddOption,
  onToggleOptionCorrect,
  onRemoveOption,
}) {
  const [enonce, setEnonce] = useState("");
  const [type, setType] = useState("qcm");

  function handleAddQuestion() {
    if (!enonce.trim()) return;
    onAddQuestion({ enonce: enonce.trim(), type_question: type });
    setEnonce("");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Questions</h2>

      {questions.length === 0 && (
        <p className="text-sm text-slate-500">
          Aucune question ajoutée pour l'instant.
        </p>
      )}

      <ul className="space-y-4">
        {questions.map((q, index) => (
          <li
            key={q.id}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {index + 1}. {q.enonce}
                </p>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {TYPES.find((t) => t.value === q.type_question)?.label}
                </p>
              </div>
              <button
                onClick={() => onRemoveQuestion(q.id)}
                className="text-xs text-red-500 hover:underline"
              >
                Supprimer
              </button>
            </div>

            {q.type_question === "qcm" && (
              <OptionEditor
                options={q.options || []}
                onAdd={(texte) => onAddOption(q.id, texte)}
                onToggleCorrect={(optionId) =>
                  onToggleOptionCorrect(q.id, optionId)
                }
                onRemove={(optionId) => onRemoveOption(q.id, optionId)}
              />
            )}
          </li>
        ))}
      </ul>

      <div className="rounded-lg border border-dashed border-slate-300 p-4">
        <p className="mb-2 text-sm font-medium text-slate-700">
          Ajouter une question
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={enonce}
            onChange={(e) => setEnonce(e.target.value)}
            placeholder="Énoncé de la question"
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddQuestion}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}