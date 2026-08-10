import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/formations", label: "Formations" },
  { to: "/admin/evaluations", label: "Évaluations" },
  { to: "/admin/users", label: "Utilisateurs" },
  { to: "/admin/certifications", label: "Certifications" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-slate-200 bg-white p-4">
      <p className="mb-6 px-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Administration
      </p>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
