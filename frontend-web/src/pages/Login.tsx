import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        // --- REQUÊTE INSCRIPTION VIA LE PROXY VITE ---
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: name,
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Erreur lors de l'inscription.");
        }

        alert(`Compte créé avec succès pour ${data.nom} ! Vous pouvez vous connecter.`);
        setIsRegistering(false);
      } else {
        // --- REQUÊTE CONNEXION VIA LE PROXY VITE ---
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Email ou mot de passe incorrect.");
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

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
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
              }}
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