function getExpirationStatus(dateExpiration) {
  if (!dateExpiration) return { label: "Sans expiration", tone: "slate" };

  const days = Math.ceil(
    (new Date(dateExpiration) - new Date()) / (1000 * 60 * 60 * 24)
  );

  if (days < 0) return { label: "Expirée", tone: "red" };
  if (days <= 30) return { label: `Expire dans ${days} j`, tone: "amber" };
  return { label: "Valide", tone: "green" };
}

const TONE_CLASSES = {
  slate: "bg-slate-100 text-slate-600",
  red: "bg-red-100 text-red-700",
  amber: "bg-amber-100 text-amber-700",
  green: "bg-green-100 text-green-700",
};

export default function CertificationTable({ certifications, onDelete }) {
  if (certifications.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
        Aucune certification délivrée pour le moment.
      </p>
    );
  }

  return (
    <table className="w-full border-collapse overflow-hidden rounded-lg border border-slate-200 bg-white text-sm">
      <thead>
        <tr className="bg-slate-100 text-left text-slate-600">
          <th className="px-4 py-3 font-medium">Utilisateur</th>
          <th className="px-4 py-3 font-medium">Certification</th>
          <th className="px-4 py-3 font-medium">Obtenue le</th>
          <th className="px-4 py-3 font-medium">Statut</th>
          <th className="px-4 py-3 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {certifications.map((c) => {
          const status = getExpirationStatus(c.date_expiration);
          return (
            <tr key={c.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-medium text-slate-800">
                {c.user_nom}
              </td>
              <td className="px-4 py-3 text-slate-600">{c.intitule}</td>
              <td className="px-4 py-3 text-slate-600">
                {c.date_obtention}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${TONE_CLASSES[status.tone]}`}
                >
                  {status.label}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  {c.fichier_pdf && (
                    <a
                      href={c.fichier_pdf}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Voir le PDF de ${c.intitule}`}
                      title="Voir le PDF"
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
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => onDelete(c.id)}
                    aria-label={`Supprimer la certification de ${c.user_nom}`}
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
          );
        })}
      </tbody>
    </table>
  );
}