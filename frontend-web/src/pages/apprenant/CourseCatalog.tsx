import { useState, useEffect } from "react";
import CourseCard from "../../components/courses/CourseCard";

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  duration: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function CourseCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const loadCourses = () => {
    const url = storedUser
      ? `${API_BASE}/formations/user/${storedUser.id}`
      : `${API_BASE}/formations`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des formations");
        return res.json();
      })
      .then((data: Course[]) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les formations.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleEnroll = async (courseId: string) => {
    if (!storedUser) {
      alert("Veuillez vous connecter pour vous inscrire à une formation.");
      return;
    }

    setEnrollingId(courseId);
    try {
      const res = await fetch(`${API_BASE}/formations/${courseId}/inscrire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: storedUser.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Erreur lors de l'inscription.");
        return;
      }

      loadCourses(); // Rafraîchit la liste
    } catch (err) {
      console.error(err);
      alert("Erreur réseau lors de l'inscription.");
    } finally {
      setEnrollingId(null);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Catalogue des Formations
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Explorez et inscrivez-vous aux modules disponibles pour développer
            vos compétences.
          </p>
        </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-sm text-gray-500 col-span-full">Chargement...</p>
        ) : error ? (
          <p className="text-sm text-red-500 col-span-full">{error}</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id} // ✅ CORRECTION : l'ID est bien passé
              title={course.title}
              category={course.category}
              progress={course.progress}
              duration={course.duration}
              onEnroll={() => handleEnroll(course.id)}
              enrolling={enrollingId === course.id}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 col-span-full">
            Aucune formation ne correspond à votre recherche.
          </p>
        )}
      </div>
    </div>
  );
}