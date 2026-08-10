
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import FormationTable from "../../components/formations/FormationTable";

export default function FormationListPage() {
  const navigate = useNavigate();

  const [formations, setFormations] = useState([
    {
      id: 1,
      titre: "Développement Web avec React",
      description: "Formation complète sur React.js",
      type: "Interne",
      duree: 30,
      statut: "Active",
    },
    {
      id: 2,
      titre: "Python et FastAPI",
      description: "Apprentissage de Python et FastAPI",
      type: "Interne",
      duree: 45,
      statut: "Active",
    },
    {
      id: 3,
      titre: "JavaScript Avancé",
      description: "Formation JavaScript niveau avancé",
      type: "Externe",
      duree: 30,
      statut: "Inactive",
    },
  ]);

  function handleDelete(id) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette formation ?"
    );

    if (!confirmation) {
      return;
    }

    setFormations(function (prev) {
      return prev.filter(function (formation) {
        return formation.id !== id;
      });
    });
  }

  function handleEdit(id) {
    navigate("/admin/formations/" + id);
  }

  return (
    <AdminLayout>
      <div className="p-6">

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Formations
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Gérer le catalogue de formations internes et externes.
            </p>
          </div>

          <button
            type="button"
            onClick={function () {
              navigate("/admin/formations/nouvelle");
            }}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            + Nouvelle formation
          </button>
        </div>

        <div className="rounded-xl bg-white shadow-sm">
          {formations.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-slate-500">
                Aucune formation disponible.
              </p>

              <button
                type="button"
                onClick={function () {
                  navigate("/admin/formations/nouvelle");
                }}
                className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                + Créer une formation
              </button>
            </div>
          ) : (
            <FormationTable
              formations={formations}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>

      </div>
    </AdminLayout>
  );
}

