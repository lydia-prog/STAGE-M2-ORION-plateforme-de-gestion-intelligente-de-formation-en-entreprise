import React from 'react';

export default function EvaluationCard({ evaluation, onStart }) {
  const isCompleted = evaluation.note !== "En attente";

  return (
    <div className="group p-5 rounded-xl bg-white border border-gray-200/70 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-200 hover:shadow-md hover:border-blue-200">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
            isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {isCompleted ? 'Validé / Noté' : 'À passer'}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
          {evaluation.titre}
        </h3>
        <p className="text-xs text-gray-500 flex items-center gap-1.5">
          Résultat actuel : <span className="font-semibold text-gray-700">{evaluation.note}</span>
        </p>
      </div>

      <button 
        onClick={() => onStart(evaluation.id)}
        className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm ${
          isCompleted 
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 hover:shadow-lg'
        }`}
      >
        {isCompleted ? 'Revoir le quiz' : 'Commencer'}
      </button>
    </div>
  );
}