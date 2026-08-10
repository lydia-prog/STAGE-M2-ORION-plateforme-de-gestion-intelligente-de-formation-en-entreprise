
import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import UserTable from "../../components/users/UserTable";
import UserForm from "../../components/users/UserForm";

export default function UserListPage() {
  // ==============================
  // DONNÉES LOCALES TEMPORAIRES
  // ==============================
  const [users, setUsers] = useState([
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

  const [showForm, setShowForm] = useState(false);

  // ==============================
  // MODIFICATION DU RÔLE
  // ==============================
  function handleRoleChange(id, role) {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, role }
          : user
      )
    );
  }

  // ==============================
  // CRÉATION LOCALE
  // ==============================
  function handleCreate(data) {
    const newUser = {
      id:
        users.length > 0
          ? Math.max(...users.map((user) => user.id)) + 1
          : 1,
      ...data,
    };

    setUsers((prev) => [...prev, newUser]);
    setShowForm(false);
  }

  // ==============================
  // SUPPRESSION LOCALE
  // ==============================
  function handleDelete(id) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ?"
    );

    if (!confirmation) {
      return;
    }

    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );
  }

  // ==============================
  // AFFICHAGE
  // ==============================
  return (
    <AdminLayout>
      <div className="p-6">

        {/* ==============================
            EN-TÊTE
        ============================== */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Utilisateurs
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Gérer les comptes et les rôles
              (employé, manager, administrateur).
            </p>
          </div>

          {/* Bouton nouvel utilisateur */}
          <button
            type="button"
            onClick={() => setShowForm((value) => !value)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {showForm
              ? "Fermer"
              : "+ Nouvel utilisateur"}
          </button>

        </div>

        {/* ==============================
            FORMULAIRE
        ============================== */}
        {showForm && (
          <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
            <UserForm onSubmit={handleCreate} />
          </div>
        )}

        {/* ==============================
            TABLEAU
        ============================== */}
        <div className="rounded-xl bg-white shadow-sm">

          {users.length === 0 ? (
            <div className="p-8 text-center">

              <p className="text-sm text-slate-500">
                Aucun utilisateur disponible.
              </p>

            </div>
          ) : (
            <UserTable
              users={users}
              onRoleChange={handleRoleChange}
              onDelete={handleDelete}
            />
          )}

        </div>

      </div>
    </AdminLayout>
  );
}

