export default function MainContent({ stats, alertes, users, searchTerm, setSearchTerm, error }) {
  return (
    <div className="p-6 md:p-10 space-y-8 flex-1 overflow-y-auto">
      
      {/* --- CARTES DE SYNTHÈSE --- */}
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

      {/* --- GRAPHIQUES & ALERTES --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graphique */}
        <div className="lg:col-span-2 bg-slate-800/70 border border-slate-700/60 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Progression et Suivi des Formations</h2>
            <span className="text-xs text-slate-400 bg-slate-700 px-3 py-1 rounded-lg">Ce mois</span>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-700">
            <div className="w-full bg-blue-500/30 rounded-t-lg flex flex-col items-center justify-end pb-2 h-[60%]"><span className="text-xs text-slate-300">Sem 1</span></div>
            <div className="w-full bg-blue-500/50 rounded-t-lg flex flex-col items-center justify-end pb-2 h-[80%]"><span className="text-xs text-slate-300">Sem 2</span></div>
            <div className="w-full bg-blue-600 rounded-t-lg flex flex-col items-center justify-end pb-2 h-[95%]"><span className="text-xs text-white font-bold">Sem 3</span></div>
            <div className="w-full bg-blue-500/40 rounded-t-lg flex flex-col items-center justify-end pb-2 h-[70%]"><span className="text-xs text-slate-300">Sem 4</span></div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-3 px-2">
            <span>Objectif atteint à 84%</span>
            <span>Mise à jour en temps réel</span>
          </div>
        </div>

        {/* Alertes */}
        <div className="bg-slate-800/70 border border-slate-700/60 p-6 rounded-2xl shadow-xl flex flex-col">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><span>🔔</span> Alertes Système</h2>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {alertes.map((alerte) => (
              <div key={alerte.id} className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-sm flex gap-3 items-start">
                <span className="text-amber-400 text-lg">⚠️</span>
                <p className="text-amber-200/90 leading-relaxed">{alerte.message}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- TABLEAU DES UTILISATEURS --- */}
      <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-semibold">Gestion des Utilisateurs & Rôles</h2>
          <input 
            type="text" 
            placeholder="Rechercher par nom ou email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-700/60 border border-slate-600 px-4 py-2 rounded-lg text-sm w-full sm:w-72 focus:outline-none focus:border-blue-500"
          />
        </div>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg text-sm">{error}</div>}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4">ID</th>
                <th className="p-4">Nom complet</th>
                <th className="p-4">Email</th>
                <th className="p-4">Rôle</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-sm">
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-700/20 transition">
                    <td className="p-4 text-slate-400">#{u.id}</td>
                    <td className="p-4 font-medium">{u.nom}</td>
                    <td className="p-4 text-slate-300">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        u.role === "admin" 
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" 
                          : u.role === "rh"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => alert(`Modifier ${u.nom}`)} className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-md text-xs transition">
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">Aucun utilisateur trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}