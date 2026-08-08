import React from 'react';

export default function SkillCard({ skill }) {
  return (
    <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm transition hover:shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800 text-sm">{skill.nom}</h3>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
          {skill.niveau}
        </span>
      </div>
      
      {/* Barre de progression automatique */}
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-blue-600 h-full rounded-full transition-all duration-500" 
          style={{ width: `${skill.progression}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-[11px] text-gray-400">Progression</span>
        <span className="text-xs font-semibold text-gray-700">{skill.progression}%</span>
      </div>
    </div>
  );
}