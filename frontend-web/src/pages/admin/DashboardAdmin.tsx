// src/pages/admin/DashboardAdmin.tsx
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { useState } from "react";

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = {
    formationsPrevues: 18,
    salariesActifs: 142,
    tauxCompletionGlobal: "84%",
  };

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : { nom: "Administrateur", role: "admin" };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">

      {/* --- SIDEBAR IMPORTÉE --- */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* --- CONTENEUR PRINCIPAL --- */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* --- NAVBAR IMPORTÉE --- */}
        <Navbar currentUser={currentUser} />

        {/* --- CONTENU DE LA PAGE --- */}
        <main className="p-6 md:p-10 space-y-8 flex-1 overflow-y-auto">

          {activeTab === "dashboard" && (
            <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-semibold">Tableau de bord</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-slate-800/70 border border-slate-700/60 p-6 rounded-2xl shadow-xl flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Formations prévues</p>
                    <p className="text-4xl font-extrabold mt-2 text-blue-400">{stats.formationsPrevues}</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-blue-400 text-2xl">📚</div>
                </div>

                <div className="bg-slate-800/70 border border-slate-700/60 p-6 rounded-2xl shadow-xl flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Salariés actifs</p>
                    <p className="text-4xl font-extrabold mt-2 text-emerald-400">{stats.salariesActifs}</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-400 text-2xl">👥</div>
                </div>

                <div className="bg-slate-800/70 border border-slate-700/60 p-6 rounded-2xl shadow-xl flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Taux de complétion global</p>
                    <p className="text-4xl font-extrabold mt-2 text-amber-400">{stats.tauxCompletionGlobal}</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-amber-400 text-2xl">📈</div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}