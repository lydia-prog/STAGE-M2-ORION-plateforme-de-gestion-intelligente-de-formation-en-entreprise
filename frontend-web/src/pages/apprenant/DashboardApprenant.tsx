import CourseCard from "../../components/courses/CourseCard";

export default function DashboardApprenant() {
  return (
    <div className="space-y-8">
      
      {/* En-tête de bienvenue */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bonjour, Lydia 👋</h1>
          <p className="text-sm text-gray-500 mt-1">Heureux de vous revoir. Voici un récapitulatif de votre progression en cours.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-100">
            Objectif : 3 formations ce mois-ci
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Formations en cours</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">2</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            📚
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Formations terminées</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">1</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            ✅
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Temps d'apprentissage</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">7h 45</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            ⏱️
          </div>
        </div>
      </div>

      {/* Section des cours en cours */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Reprendre là où vous vous êtes arrêté</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard 
            title="Sécurité et Conformité en Entreprise" 
            category="Réglementation" 
            progress={75} 
            duration="2h 30min" 
          />
          <CourseCard 
            title="Introduction à la Gestion de Projet Agile" 
            category="Management" 
            progress={30} 
            duration="4h 00min" 
          />
        </div>
      </div>

    </div>
  );
}