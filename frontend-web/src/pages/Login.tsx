import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Importez useNavigate

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const navigate = useNavigate(); // 2. Initialisez le hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistering) {
      alert(`Compte créé avec succès pour ${name} ! Vous pouvez vous connecter.`);
      setIsRegistering(false);
    } else {
      // 3. Redirection vers le dashboard après la connexion
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 border border-slate-800">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            SmartForm Entreprise
          </span>
          <h1 className="text-2xl font-bold text-slate-800">
            {isRegistering ? "Créer un compte" : "Connexion à votre espace"}
          </h1>
          <p className="text-sm text-gray-500">
            {isRegistering 
              ? "Rejoignez la plateforme de formation interne" 
              : "Entrez vos identifiants professionnels"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex: Jean Dupont" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition text-sm text-slate-800"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email professionnel</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: lydia@entreprise.com" 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition text-sm text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition text-sm text-slate-800"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition text-sm shadow-sm"
          >
            {isRegistering ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {isRegistering ? "Vous avez déjà un compte ?" : "Pas encore de compte ?"}
            <button 
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="ml-1.5 text-blue-600 font-semibold hover:underline focus:outline-none"
            >
              {isRegistering ? "Se connecter" : "Créer un compte"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}