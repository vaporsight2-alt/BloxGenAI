
export interface GeneratedScript {
  id: string;
  title: string;
  code: string;
  explanation: string;
  timestamp: number;
  type: 'LocalScript' | 'Script' | 'ModuleScript';
}

export interface ScriptTemplate {
  name: string;
  description: string;
  prompt: string;
  icon: string;
}
