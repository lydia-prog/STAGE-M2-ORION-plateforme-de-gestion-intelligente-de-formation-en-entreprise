import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import EvaluationTable from "../../components/evaluations/EvaluationTable";

export default function EvaluationListPage() {
  const navigate = useNavigate();

  // Données locales temporaires
  // Aucune API utilisée
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      titre: "Évaluation React.js",
      description: "Test sur les bases de React.js",
      formation: "Développement Web avec React",
      type: "Quiz",
      duree: 30,
      nombre_questions: 10,
      statut: "Active",
    },
    {
      id: 2,
      titre: "Évaluation Python",
      description: "Évaluation des connaissances Python",
      formation: "Python et FastAPI",
      type: "Test",
      duree: 45,
      nombre_questions: 15,
      statut: "Active",
    },
    {
      id: 3,
      titre: "Évaluation JavaScript",
      description: "Test JavaScript avancé",
      formation: "JavaScript Avancé",
      type: "Quiz",
      duree: 30,
      nombre_questions: 12,
      statut: "Inactive",
    },
  ]);

  // Suppression locale
  function handleDelete(id) {
    const confirmation = window.confirm(
      "Supprimer cette évaluation ?"
    );

    if (!confirmation) {
      return;
    }

    setEvaluations((prev) =>
      prev.filter((evaluation) => evaluation.id !== id)
    );
  }

  // Modification
  function handleEdit(id) {
    navigate(`/admin/evaluations/${id}`);
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50 p-6">

        {/* ==============================
            EN-TÊTE
        ============================== */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Évaluations
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Gérer les quiz et tests rattachés aux formations.
            </p>
          </div>

          {/* Bouton nouvelle évaluation */}
          <button
            type="button"
            onClick={() =>
              navigate("/admin/evaluations/nouvelle")
            }
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            + Nouvelle évaluation
          </button>

        </div>

        {/* ==============================
            TABLEAU
        ============================== */}
        <div className="rounded-xl bg-white shadow-sm">

          {evaluations.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-slate-500">
                Aucune évaluation disponible.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/evaluations/nouvelle")
                }
                className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                + Créer une évaluation
              </button>
            </div>
          ) : (
            <EvaluationTable
              evaluations={evaluations}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}

        </div>

      </div>
    </AdminLayout>
  );
}