
import React, { useState, useEffect, useCallback } from 'react';
import { Send, Terminal, Sparkles, Loader2, Menu, X, Rocket } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TemplateGrid from './components/TemplateGrid';
import ScriptViewer from './components/ScriptViewer';
import { generateRobloxScript } from './services/geminiService';
import { GeneratedScript, ScriptTemplate } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<GeneratedScript[]>([]);
  const [activeScript, setActiveScript] = useState<GeneratedScript | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // PWA Installation handling
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bloxgen_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('bloxgen_history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setActiveScript(null);

    try {
      const data = await generateRobloxScript(prompt);
      const newScript: GeneratedScript = {
        ...data,
        id: crypto.randomUUID(),
        timestamp: Date.now()
      };
      
      setHistory(prev => [newScript, ...prev].slice(0, 50));
      setActiveScript(newScript);
      setPrompt('');
    } catch (error) {
      alert("Something went wrong while generating the script. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (template: ScriptTemplate) => {
    setPrompt(template.prompt);
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your generation history?")) {
      setHistory([]);
      localStorage.removeItem('bloxgen_history');
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-zinc-100 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0f0f12] border-b border-zinc-800 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <Terminal size={18} className="text-white" />
          </div>
          <span className="font-bold tracking-tight text-white">BloxGen AI</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile overlay */}
      <div className={`${mobileMenuOpen ? 'fixed inset-0 z-40 bg-black/60' : ''}`}>
        <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 h-full fixed md:relative z-50`}>
          <Sidebar 
            history={history} 
            onSelect={(s) => {
              setActiveScript(s);
              setMobileMenuOpen(false);
            }} 
            onNew={() => {
              setActiveScript(null);
              setMobileMenuOpen(false);
            }}
            onClearHistory={clearHistory}
            onInstall={handleInstall}
            showInstall={!!deferredPrompt}
            activeId={activeScript?.id}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative mt-14 md:mt-0">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {!activeScript && !isLoading ? (
            <div className="max-w-4xl mx-auto py-8 md:py-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-400 px-4 py-2 rounded-full mb-6 border border-blue-500/20">
                  <Sparkles size={16} />
                  <span className="text-sm font-semibold tracking-wide">Powered by Gemini 3 Pro</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                  Design Better <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Roblox Games</span>
                </h1>
                <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-light">
                  Generate high-performance Luau scripts, game mechanics, and complex UI logic in seconds. 
                  Just describe what you want to build.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Rocket size={16} />
                  Quick Templates
                </h2>
                <TemplateGrid onSelect={handleTemplateSelect} />
              </div>
            </div>
          ) : activeScript ? (
            <ScriptViewer script={activeScript} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 animate-in fade-in zoom-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin relative" />
              </div>
              <p className="mt-8 text-xl font-medium text-white">Architecting your script...</p>
              <p className="mt-2 text-zinc-500">Writing optimized Luau code for Roblox Studio</p>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 md:p-8 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c] to-transparent">
          <div className="max-w-4xl mx-auto">
            <form 
              onSubmit={handleGenerate}
              className="relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl focus-within:border-blue-500/50 transition-all"
            >
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What script do you need today? e.g. 'A smooth pet following system with lerping'"
                rows={1}
                className="w-full bg-transparent border-none focus:ring-0 text-zinc-100 placeholder-zinc-500 px-6 py-5 pr-20 resize-none max-h-48 overflow-y-auto"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
              <div className="absolute right-4 bottom-4">
                <button
                  type="submit"
                  disabled={!prompt.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white p-3 rounded-xl transition-all shadow-lg shadow-blue-600/20"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
            </form>
            <p className="mt-3 text-center text-xs text-zinc-600">
              Use <span className="text-zinc-400">Shift + Enter</span> for new lines. 
              BloxGen AI generates code that should be audited for specific game needs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
