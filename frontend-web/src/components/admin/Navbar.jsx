export default function Navbar() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : { nom: "Administrateur", role: "admin" };

  return (
    <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/60 h-16 px-6 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full">
          Espace Admin
        </span>
        <h2 className="text-sm font-medium text-slate-300 hidden sm:block">Plateforme de Surveillance & Suivi</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-200">{user.nom}</p>
          <p className="text-xs text-purple-400 uppercase font-medium">{user.role}</p>
        </div>
        <div className="h-9 w-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold">
          {user.nom.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}