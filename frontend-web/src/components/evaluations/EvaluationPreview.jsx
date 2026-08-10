export default function EvaluationPreview({ evaluation }) {
  if (!evaluation) return null;

  return (
    <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-indigo-500">
        Aperçu apprenant
      </p>
      <h2 className="mb-1 text-xl font-semibold text-slate-800">
        {evaluation.titre}
      </h2>
      <p className="mb-6 text-sm text-slate-500">
        Seuil de réussite : {evaluation.seuil_reussite}% ·{" "}
        {evaluation.questions?.length || 0} question(s)
      </p>

      <ol className="space-y-6">
        {(evaluation.questions || []).map((q, index) => (
          <li key={q.id}>
            <p className="mb-2 text-sm font-medium text-slate-800">
              {index + 1}. {q.enonce}
            </p>

            {q.type_question === "qcm" && (
              <div className="space-y-2 pl-4">
                {(q.options || []).map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <input type="radio" name={`question-${q.id}`} disabled />
                    {opt.texte}
                  </label>
                ))}
              </div>
            )}

            {q.type_question === "vrai_faux" && (
              <div className="flex gap-4 pl-4">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="radio" name={`question-${q.id}`} disabled />
                  Vrai
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="radio" name={`question-${q.id}`} disabled />
                  Faux
                </label>
              </div>
            )}

            {q.type_question === "texte_libre" && (
              <textarea
                disabled
                rows={2}
                placeholder="Réponse de l'apprenant..."
                className="ml-4 w-[calc(100%-1rem)] rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400"
              />
            )}
          </li>
        ))}
      </ol>

      <button
        disabled
        className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white opacity-50"
      >
        Envoyer mes réponses
      </button>
    </div>
  );
}