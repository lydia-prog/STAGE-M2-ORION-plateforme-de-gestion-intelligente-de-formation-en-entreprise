import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import EvaluationForm from "../../components/evaluations/EvaluationForm";

export default function EvaluationFormPage() {
  const navigate = useNavigate();

  // Formations locales temporaires
  const [formations] = useState([
    {
      id: 1,
      titre: "Développement Web avec React",
    },
    {
      id: 2,
      titre: "Python et FastAPI",
    },
    {
      id: 3,
      titre: "JavaScript Avancé",
    },
    {
      id: 4,
      titre: "Gestion des bases de données MySQL",
    },
  ]);

  const [error, setError] = useState("");

  // Soumission locale
  function handleSubmit(data) {
    try {
      console.log("Nouvelle évaluation :", data);

      // Pour le moment, aucune API n'est utilisée.
      // On revient simplement à la liste des évaluations.
      navigate("/admin/evaluations");
    } catch (err) {
      setError(
        err.message || "Une erreur est survenue."
      );
    }
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50 p-6">

        {/* ==============================
            EN-TÊTE
        ============================== */}
        <div className="mb-6">

          <h1 className="text-2xl font-bold text-slate-800">
            Nouvelle évaluation
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Rattachée à une formation existante,
            avec son seuil de réussite.
          </p>

        </div>

        {/* ==============================
            MESSAGE D'ERREUR
        ============================== */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ==============================
            FORMULAIRE
        ============================== */}
        <div className="rounded-xl bg-white p-6 shadow-sm">

          <EvaluationForm
            formations={formations}
            onSubmit={handleSubmit}
          />

        </div>

      </div>
    </AdminLayout>
  );
}