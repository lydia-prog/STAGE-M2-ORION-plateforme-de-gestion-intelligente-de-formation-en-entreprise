import { useState } from "react";
import { useParams } from "react-router-dom";
import { courses } from "../../data/coursesData";

export default function CourseDetail() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(courses.find(c => c.id === id));

  // Logique pour valider un module
  const toggleModule = (moduleId: string) => {
    if (!courseData) return;
    
    const updatedModules = courseData.modules.map(m => 
      m.id === moduleId ? { ...m, isCompleted: !m.isCompleted } : m
    );
    
    // Calcul de la progression réelle
    const completedCount = updatedModules.filter(m => m.isCompleted).length;
    const progress = (completedCount / updatedModules.length) * 100;

    setCourseData({ ...courseData, modules: updatedModules, progress });
  };

  if (!courseData) return <div>Cours introuvable.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Barre de progression réelle */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">{courseData.title}</h1>
        <div className="w-full bg-gray-200 h-3 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-500" 
            style={{ width: `${courseData.progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">{Math.round(courseData.progress)}% complété</p>
      </div>

      {/* Liste des modules interactive */}
      <div className="space-y-3">
        {courseData.modules.map((module) => (
          <div 
            key={module.id}
            onClick={() => toggleModule(module.id)}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all
              ${module.isCompleted ? "bg-emerald-50 border-emerald-200" : "bg-white border-gray-100 hover:border-blue-200"}`}
          >
            <span className={`font-medium ${module.isCompleted ? "text-emerald-800" : "text-slate-700"}`}>
              {module.title}
            </span>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${module.isCompleted ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-300"}`}>
              {module.isCompleted && "✓"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}