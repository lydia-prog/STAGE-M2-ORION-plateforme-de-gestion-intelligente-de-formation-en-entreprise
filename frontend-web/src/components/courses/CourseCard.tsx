import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  id?: number;
  title: string;
  category: string;
  progress: number;
  duration: string;
}

export default function CourseCard({ id = 1, title, category, progress, duration }: CourseCardProps) {
  const navigate = useNavigate();

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
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <button 
          onClick={() => navigate(`/course/${id}`)}
          className="w-full mt-4 bg-slate-900 text-white text-sm py-2 rounded-lg font-medium hover:bg-slate-800 transition"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}