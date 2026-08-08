import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <nav className="space-y-2">
        <Link 
          to="/dashboard" 
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition ${
            isActive('/dashboard') ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'
          }`}
        >
          <span>Tableau de bord</span>
        </Link>
        <Link 
          to="/catalog" 
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition ${
            isActive('/catalog') ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'
          }`}
        >
          <span>Catalogue</span>
        </Link>
        <Link 
          to="/evaluations" 
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition ${
            isActive('/evaluations') ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'
          }`}
        >
          <span>Mes Évaluations</span>
        </Link>
        <Link 
          to="/certifications" 
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition ${
            isActive('/certifications') ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'
          }`}
        >
          <span>Mes Certifications</span>
        </Link>
        <Link 
          to="/profile" 
          className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition ${
            isActive('/profile') ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'
          }`}
        >
          <span>Mon Profil & Compétences</span>
        </Link>
      </nav>
      <div className="text-xs text-slate-500 text-center py-2">
        SmartForm v1.0
      </div>
    </aside>
  );
}