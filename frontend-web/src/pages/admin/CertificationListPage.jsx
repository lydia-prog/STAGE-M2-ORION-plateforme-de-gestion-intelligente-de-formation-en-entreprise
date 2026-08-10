import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import CertificationTable from "../../components/certifications/CertificationTable";

export default function CertificationListPage() {
  // Données locales pour le moment
  // Aucune API utilisée
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      code: "CERT-001",
      nom: "Certification React.js",
      nom_apprenant: "Lydia Rasoafiavy",
      formation_nom: "Développement Web avec React",
      date_delivrance: "2026-07-15",
      date_expiration: "2027-07-15",
    },
    {
      id: 2,
      code: "CERT-002",
      nom: "Certification Python",
      nom_apprenant: "Jean Rakoto",
      formation_nom: "Python et FastAPI",
      date_delivrance: "2026-06-20",
      date_expiration: "2027-06-20",
    },
    {
      id: 3,
      code: "CERT-003",
      nom: "Certification JavaScript",
      nom_apprenant: "Marie Andria",
      formation_nom: "JavaScript Avancé",
      date_delivrance: "2026-05-10",
      date_expiration: "2026-08-25",
    },
  ]);

  // Suppression locale uniquement
  function handleDelete(id) {
    const confirmation = window.confirm(
      "Supprimer cette certification ?"
    );

    if (!confirmation) {
      return;
    }

    setCertifications((prev) =>
      prev.filter(
        (certification) => certification.id !== id
      )
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
            Certifications
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Vue d'ensemble des certifications délivrées,
            avec alerte avant expiration.
          </p>
        </div>

        {/* ==============================
            TABLEAU
        ============================== */}
        <div className="rounded-xl bg-white shadow-sm">

          {certifications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-slate-500">
                Aucune certification disponible.
              </p>
            </div>
          ) : (
            <CertificationTable
              certifications={certifications}
              onDelete={handleDelete}
            />
          )}

        </div>

      </div>
    </AdminLayout>
  );
}