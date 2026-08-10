const ROLES = [
  { value: "employe", label: "Employé" },
  { value: "manager", label: "Manager / RH" },
  { value: "admin", label: "Administrateur" },
];

export default function UserTable({ users, onRoleChange, onDelete }) {
  if (users.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
        Aucun utilisateur pour le moment.
      </p>
    );
  }

  return (
    <table className="w-full border-collapse overflow-hidden rounded-lg border border-slate-200 bg-white text-sm">
      <thead>
        <tr className="bg-slate-100 text-left text-slate-600">
          <th className="px-4 py-3 font-medium">Nom</th>
          <th className="px-4 py-3 font-medium">Email</th>
          <th className="px-4 py-3 font-medium">Rôle</th>
          <th className="px-4 py-3 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-t border-slate-100">
            <td className="px-4 py-3 font-medium text-slate-800">{u.nom}</td>
            <td className="px-4 py-3 text-slate-600">{u.email}</td>
            <td className="px-4 py-3">
              <select
                value={u.role}
                onChange={(e) => onRoleChange(u.id, e.target.value)}
                className="rounded-md border border-slate-300 px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none"
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-4 py-3">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onDelete(u.id)}
                  aria-label={`Supprimer ${u.nom}`}
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