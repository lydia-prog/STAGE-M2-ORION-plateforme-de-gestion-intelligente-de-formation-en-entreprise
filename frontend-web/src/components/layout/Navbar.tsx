export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-3">
        <span className="text-xl font-bold text-blue-600">SmartForm</span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">Entreprise</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700 font-medium">Utilisateur</span>
        <a href="/login" className="text-sm text-red-600 hover:text-red-800 font-medium">Déconnexion</a>
      </div>
    </header>
  );
}