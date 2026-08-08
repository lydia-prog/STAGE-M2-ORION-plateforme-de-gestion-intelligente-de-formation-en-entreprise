// src/components/admin/Sidebar.jsx
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700/60 hidden md:flex flex-col justify-between p-6">
      <div className="space-y-6">
        {/* Logo / Titre */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white font-bold p-2.5 rounded-xl text-lg shadow-lg">
            🛡️
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wide">SmartForm</h1>
            <p className="text-xs text-slate-400">Administration</p>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="space-y-1">
          <button 
            onClick={() => {
              navigate("/admin");
              setActiveTab && setActiveTab("dashboard");
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              location.pathname === "/admin" && activeTab === "dashboard" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
            }`}
          >
            <span>📊</span> Vue d'ensemble
          </button>

          <button 
            onClick={() => {
              navigate("/admin");
              setActiveTab && setActiveTab("users");
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              location.pathname === "/admin" && activeTab === "users" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
            }`}
          >
            <span>👥</span> Gestion Utilisateurs
          </button>

          <button 
            onClick={() => navigate("/admin/contents")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              location.pathname === "/admin/contents" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
            }`}
          >
            <span>📁</span> Contenus & Évaluations
          </button>
        </nav>
      </div>

      {/* Bouton de déconnexion en bas */}
      <button 
        onClick={handleLogout}
        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2"
      >
        <span>🚪</span> Déconnexion
      </button>
    </aside>
  );
}