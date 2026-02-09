
import React from 'react';
import { History, Plus, BookOpen, Trash2 } from 'lucide-react';
import { GeneratedScript } from '../types';

interface SidebarProps {
  history: GeneratedScript[];
  onSelect: (script: GeneratedScript) => void;
  onNew: () => void;
  onClearHistory: () => void;
  activeId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ history, onSelect, onNew, onClearHistory, activeId }) => {
  return (
    <div className="w-80 h-full border-r border-zinc-800 bg-[#0f0f12] flex flex-col hidden md:flex">
      <div className="p-4 border-b border-zinc-800">
        <button 
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg transition-all"
        >
          <Plus size={20} />
          New Script
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="flex items-center gap-2 px-2 py-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
          <History size={14} />
          Recent Scripts
        </div>
        
        {history.length === 0 ? (
          <div className="px-3 py-8 text-center text-zinc-600 text-sm italic">
            No scripts yet. Start generating!
          </div>
        ) : (
          history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={`w-full text-left p-3 rounded-lg transition-colors group relative ${
                activeId === item.id ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-900'
              }`}
            >
              <div className="font-medium truncate pr-4">{item.title}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{item.type} • {new Date(item.timestamp).toLocaleDateString()}</div>
            </button>
          ))
        )}
      </div>

      {history.length > 0 && (
        <div className="p-4 border-t border-zinc-800">
          <button 
            onClick={onClearHistory}
            className="w-full flex items-center gap-2 text-zinc-500 hover:text-red-400 text-sm transition-colors py-2"
          >
            <Trash2 size={16} />
            Clear History
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
