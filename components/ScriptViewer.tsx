
import React, { useState } from 'react';
import { Copy, Check, FileCode, Info } from 'lucide-react';
import { GeneratedScript } from '../types';

interface ScriptViewerProps {
  script: GeneratedScript;
}

const ScriptViewer: React.FC<ScriptViewerProps> = ({ script }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto w-full pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
              script.type === 'Script' ? 'bg-blue-900/40 text-blue-400' :
              script.type === 'LocalScript' ? 'bg-green-900/40 text-green-400' :
              'bg-orange-900/40 text-orange-400'
            }`}>
              {script.type}
            </span>
            <span className="text-zinc-500 text-sm">• Generated Script</span>
          </div>
          <h2 className="text-2xl font-bold text-white">{script.title}</h2>
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg transition-colors"
        >
          {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>

      <div className="relative group">
        <div className="absolute top-4 right-4 text-zinc-500 text-xs code-font pointer-events-none">
          LUAU
        </div>
        <div className="bg-[#1e1e24] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#16161c] border-b border-zinc-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-xs text-zinc-500 ml-2 font-medium flex items-center gap-1.5">
              <FileCode size={14} />
              {script.title}.{script.type === 'ModuleScript' ? 'lua' : 'lua'}
            </span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="code-font text-sm leading-relaxed whitespace-pre text-zinc-300">
              <code>{script.code}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-blue-600/5 border border-blue-500/20 rounded-xl p-6">
        <div className="flex items-center gap-2 text-blue-400 font-semibold mb-3">
          <Info size={18} />
          How to implement:
        </div>
        <div className="text-zinc-400 text-sm leading-relaxed space-y-2 whitespace-pre-wrap">
          {script.explanation}
        </div>
      </div>
    </div>
  );
};

export default ScriptViewer;
