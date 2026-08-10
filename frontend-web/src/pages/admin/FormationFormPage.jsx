import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import FormationForm from "../../components/formations/FormationForm";

export default function FormationFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  // Données initiales pour la modification
  const formationsInitiales = {
    1: {
      id: 1,
      titre: "Développement Web avec React",
      description:
        "Apprendre à créer des applications web modernes avec React.",
      contenu:
        "React, composants, props, state, hooks et React Router.",
      duree: 30,
      format: "En ligne",
    },

    2: {
      id: 2,
      titre: "Python et FastAPI",
      description:
        "Apprendre Python et développer des API avec FastAPI.",
      contenu:
        "Python, FastAPI, REST API, SQLAlchemy et authentification.",
      duree: 40,
      format: "En ligne",
    },

    3: {
      id: 3,
      titre: "JavaScript Avancé",
      description:
        "Approfondir les concepts avancés de JavaScript.",
      contenu:
        "ES6, fonctions, objets, promesses, async/await et modules.",
      duree: 25,
      format: "Présentiel",
    },
  };

  const [formation, setFormation] = useState(() => {
    if (isEdit && formationsInitiales[id]) {
      return formationsInitiales[id];
    }

    return null;
  });

  const [error, setError] = useState("");

  // ==============================
  // ENREGISTREMENT
  // ==============================
  function handleSubmit(data) {
    try {
      console.log(
        isEdit
          ? "Formation modifiée :"
          : "Nouvelle formation :",
        data
      );

      /*
       * Pour le moment aucune API n'est utilisée.
       *
       * En mode modification, on met simplement
       * à jour les données locales.
       */
      if (isEdit) {
        setFormation({
          ...formation,
          ...data,
        });
      }

      /*
       * En mode création, les données sont simplement
       * affichées dans la console.
       */
      if (!isEdit) {
        console.log("Formation créée :", data);
      }

      setError("");

      // Retour vers la liste des formations
      navigate("/admin/courses");
    } catch (err) {
      setError(
        err.message ||
          "Une erreur est survenue."
      );
    }
  }

  // ==============================
  // FORMATION INTROUVABLE
  // ==============================
  if (isEdit && !formation) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-slate-50 p-6">

          <div className="rounded-xl bg-white p-8 shadow-sm">

            <h1 className="text-xl font-semibold text-slate-800">
              Formation introuvable
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Aucune formation ne correspond à l'identifiant :
              {" "}
              {id}
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/courses")
              }
              className="mt-5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Retour aux formations
            </button>

          </div>

        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50 p-6">

        {/* ==============================
            EN-TÊTE
        ============================== */}
        <div className="mb-6">

          <h1 className="text-2xl font-bold text-slate-800">
            {isEdit
              ? "Modifier la formation"
              : "Nouvelle formation"}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Titre, description, contenu, durée et format.
          </p>

        </div>

        {/* ==============================
            ERREUR
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

          <FormationForm
            initialData={formation}
            onSubmit={handleSubmit}
          />

        </div>

      </div>
    </AdminLayout>
  );
}