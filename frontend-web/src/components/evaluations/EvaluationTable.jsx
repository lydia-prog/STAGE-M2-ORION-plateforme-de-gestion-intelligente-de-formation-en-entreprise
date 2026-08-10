export default function EvaluationTable({ evaluations, onDelete, onEdit }) {
  if (evaluations.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
        Aucune évaluation créée pour le moment.
      </p>
    );
  }

  return (
    <table className="w-full border-collapse overflow-hidden rounded-lg border border-slate-200 bg-white text-sm">
      <thead>
        <tr className="bg-slate-100 text-left text-slate-600">
          <th className="px-4 py-3 font-medium">Titre</th>
          <th className="px-4 py-3 font-medium">Formation liée</th>
          <th className="px-4 py-3 font-medium">Seuil de réussite</th>
          <th className="px-4 py-3 font-medium">Questions</th>
          <th className="px-4 py-3 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {evaluations.map((ev) => (
          <tr key={ev.id} className="border-t border-slate-100">
            <td className="px-4 py-3 font-medium text-slate-800">{ev.titre}</td>
            <td className="px-4 py-3 text-slate-600">{ev.formation_titre}</td>
            <td className="px-4 py-3 text-slate-600">{ev.seuil_reussite}%</td>
            <td className="px-4 py-3 text-slate-600">{ev.nb_questions ?? 0}</td>
            <td className="px-4 py-3">
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(ev.id)}
                  aria-label={`Modifier ${ev.titre}`}
                  title="Modifier"
                  className="rounded-md p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(ev.id)}
                  aria-label={`Supprimer ${ev.titre}`}
                  title="Supprimer"
                  className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}