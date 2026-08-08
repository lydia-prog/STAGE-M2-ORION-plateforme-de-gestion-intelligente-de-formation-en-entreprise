import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  category: string;
  progress: number;
  duration: string;
  onEnroll?: () => void;
  enrolling?: boolean;
}

export default function CourseCard({
  id,
  title,
  category,
  progress,
  duration,
  onEnroll,
  enrolling = false,
}: CourseCardProps) {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (id) {
      navigate(`/course/${id}`);
    } else {
      console.warn("ID manquant pour la navigation");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
          {category}
        </span>
        <h3 className="text-lg font-bold text-slate-800 mt-3">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">Durée estimée : {duration}</p>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-xs font-medium text-gray-600">
          <span>Progression</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {progress > 0 ? (
          <button
            onClick={handleContinue}
            className="w-full mt-4 bg-slate-900 text-white text-sm py-2 rounded-lg font-medium hover:bg-slate-800 transition"
          >
            Continuer
          </button>
        ) : (
          <button
            onClick={onEnroll}
            disabled={enrolling || !onEnroll}
            className="w-full mt-4 bg-blue-600 text-white text-sm py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {enrolling ? "Inscription..." : "S'inscrire"}
          </button>
        )}
      </div>
    </div>
  );
}