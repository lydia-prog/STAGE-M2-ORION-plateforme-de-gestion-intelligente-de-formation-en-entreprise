import { useState } from "react";
import CourseCard from "../../components/courses/CourseCard";

export default function CourseCatalog() {
  const [searchTerm, setSearchTerm] = useState("");

  // Liste fictive de cours disponibles
  const courses = [
    { id: 1, title: "Sécurité et Conformité en Entreprise", category: "Réglementation", progress: 0, duration: "2h 30min" },
    { id: 2, title: "Introduction à la Gestion de Projet Agile", category: "Management", progress: 0, duration: "4h 00min" },
    { id: 3, title: "Bonnes pratiques de Cybersécurité", category: "IT / Sécurité", progress: 0, duration: "1h 15min" },
    { id: 4, title: "Communication efficace en équipe", category: "Soft Skills", progress: 0, duration: "3h 00min" },
  ];

  // Filtrer les cours selon la recherche
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Catalogue des Formations</h1>
          <p className="text-sm text-gray-500 mt-1">Explorez et inscrivez-vous aux modules disponibles pour développer vos compétences.</p>
        </div>

        {/* Barre de recherche */}
        <div className="w-full md:w-72">
          <input 
            type="text"
            placeholder="Rechercher un cours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
          />
        </div>
      </div>

      {/* Grille des cours */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard 
              key={course.id}
              title={course.title}
              category={course.category}
              progress={course.progress}
              duration={course.duration}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 col-span-full">Aucune formation ne correspond à votre recherche.</p>
        )}
      </div>
    </div>
  );
}