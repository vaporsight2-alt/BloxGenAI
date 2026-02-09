
import React from 'react';
import { SCRIPT_TEMPLATES, getIcon } from '../constants';
import { ScriptTemplate } from '../types';

interface TemplateGridProps {
  onSelect: (template: ScriptTemplate) => void;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {SCRIPT_TEMPLATES.map((t, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(t)}
          className="bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-800/80 p-5 rounded-xl text-left transition-all group"
        >
          <div className="bg-zinc-800 group-hover:bg-blue-600/20 p-2.5 w-fit rounded-lg mb-4 text-blue-400 transition-colors">
            {getIcon(t.icon)}
          </div>
          <h3 className="font-semibold text-zinc-100 mb-1">{t.name}</h3>
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
            {t.description}
          </p>
        </button>
      ))}
    </div>
  );
};

export default TemplateGrid;
