
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

function StatCard({ label, value, to }) {
  return (
    <Link
      to={to}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-indigo-600">
        {value}
      </p>
    </Link>
  );
}

export default function AdminDashboard() {
  // ==============================
  // DONNÉES LOCALES
  // ==============================

  const [formations] = useState([
    {
      id: 1,
      titre: "Développement Web avec React",
      description:
        "Formation complète sur React.js et le développement frontend.",
      type: "Interne",
      duree: 30,
      statut: "Active",
    },
    {
      id: 2,
      titre: "Python et FastAPI",
      description:
        "Apprentissage de Python et création d'API avec FastAPI.",
      type: "Interne",
      duree: 45,
      statut: "Active",
    },
    {
      id: 3,
      titre: "JavaScript Avancé",
      description:
        "Formation JavaScript niveau avancé.",
      type: "Externe",
      duree: 30,
      statut: "Inactive",
    },
  ]);

  const [evaluations] = useState([
    {
      id: 1,
      titre: "Évaluation React.js",
      description:
        "Test sur les bases de React.js",
      formation:
        "Développement Web avec React",
      type: "Quiz",
      duree: 30,
      nombre_questions: 10,
      statut: "Active",
    },
    {
      id: 2,
      titre: "Évaluation Python",
      description:
        "Évaluation des connaissances Python",
      formation:
        "Python et FastAPI",
      type: "Test",
      duree: 45,
      nombre_questions: 15,
      statut: "Active",
    },
    {
      id: 3,
      titre: "Évaluation JavaScript",
      description:
        "Test JavaScript avancé",
      formation:
        "JavaScript Avancé",
      type: "Quiz",
      duree: 30,
      nombre_questions: 12,
      statut: "Inactive",
    },
  ]);

  const [users] = useState([
    {
      id: 1,
      nom: "Lydia",
      email: "lydia@gmail.com",
      role: "administrateur",
    },
    {
      id: 2,
      nom: "Jean",
      email: "jean@gmail.com",
      role: "manager",
    },
    {
      id: 3,
      nom: "Marie",
      email: "marie@gmail.com",
      role: "employé",
    },
  ]);

  const [certifications] = useState([
    {
      id: 1,
      user_nom: "Lydia",
      intitule: "Certification React.js",
      date_expiration: "2026-08-25",
    },
    {
      id: 2,
      user_nom: "Jean",
      intitule: "Certification Python",
      date_expiration: "2026-09-05",
    },
    {
      id: 3,
      user_nom: "Marie",
      intitule: "Certification JavaScript",
      date_expiration: "2027-01-15",
    },
  ]);

  // ==============================
  // CERTIFICATIONS EXPIRANT BIENTÔT
  // ==============================

  const certifsExpirantBientot = certifications.filter((certification) => {
    if (!certification.date_expiration) {
      return false;
    }

    const aujourdHui = new Date();
    const dateExpiration = new Date(
      certification.date_expiration
    );

    const days = Math.ceil(
      (dateExpiration - aujourdHui) /
        (1000 * 60 * 60 * 24)
    );

    return days >= 0 && days <= 30;
  });

  // ==============================
  // AFFICHAGE
  // ==============================

  return (
    <AdminLayout>
      <div className="p-6">

        {/* ==============================
            EN-TÊTE
        ============================== */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Tableau de bord
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Vue d'ensemble de la plateforme SmartTrain.
          </p>
        </div>

        {/* ==============================
            STATISTIQUES
        ============================== */}

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <StatCard
            label="Formations"
            value={formations.length}
            to="/admin/formations"
          />

          <StatCard
            label="Évaluations"
            value={evaluations.length}
            to="/admin/evaluations"
          />

          <StatCard
            label="Utilisateurs"
            value={users.length}
            to="/admin/users"
          />

          <StatCard
            label="Certifications"
            value={certifications.length}
            to="/admin/certifications"
          />

        </div>

        {/* ==============================
            CERTIFICATIONS
        ============================== */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Certifications à renouveler bientôt
          </h2>

          {certifsExpirantBientot.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aucune certification n'expire dans les
              30 prochains jours.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">

              {certifsExpirantBientot.map((certification) => (
                <li
                  key={certification.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="text-slate-700">
                    {certification.user_nom}
                    {" — "}
                    {certification.intitule}
                  </span>

                  <span className="font-medium text-amber-600">
                    expire le{" "}
                    {new Date(
                      certification.date_expiration
                    ).toLocaleDateString("fr-FR")}
                  </span>
                </li>
              ))}

            </ul>
          )}

        </div>

      </div>
    </AdminLayout>
  );
}

