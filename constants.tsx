
import React from 'react';
import { Shield, Zap, Layout, Database, Sword, Users, Terminal } from 'lucide-react';
import { ScriptTemplate } from './types';

export const SCRIPT_TEMPLATES: ScriptTemplate[] = [
  {
    name: 'Admin Command System',
    description: 'A modular system for custom chat commands with permissions.',
    prompt: 'Create a server-side Admin Command System. It should have a prefix (like "!"), a list of admins by UserId, and commands for "kill", "speed [player] [amount]", and "tp [player1] [player2]". Use a modular table structure for commands.',
    icon: 'Terminal'
  },
  {
    name: 'Leaderstat System',
    description: 'Create a basic Gold and XP leaderboard.',
    prompt: 'Create a server script for leaderstats with Gold and XP that saves using DataStoreService.',
    icon: 'Database'
  },
  {
    name: 'Kill Part',
    description: 'Damage players who touch a specific part.',
    prompt: 'A script that kills any player who touches the parent part, with a small cooldown.',
    icon: 'Zap'
  },
  {
    name: 'GUI Tweening',
    description: 'Smoothly open/close a main menu GUI.',
    prompt: 'A LocalScript to tween a Frame from scale (0,0,0) to (1,1,1) when a button is clicked.',
    icon: 'Layout'
  },
  {
    name: 'DataStore Helper',
    description: 'Robust player data management.',
    prompt: 'A ModuleScript for a robust DataStore system with session locking and retries.',
    icon: 'Shield'
  },
  {
    name: 'Combat Hitbox',
    description: 'Region3 or Raycast based hit detection.',
    prompt: 'A server script for a simple sword hitbox using RaycastParams.',
    icon: 'Sword'
  }
];

export const getIcon = (name: string) => {
  switch (name) {
    case 'Database': return <Database size={18} />;
    case 'Zap': return <Zap size={18} />;
    case 'Layout': return <Layout size={18} />;
    case 'Shield': return <Shield size={18} />;
    case 'Sword': return <Sword size={18} />;
    case 'Users': return <Users size={18} />;
    case 'Terminal': return <Terminal size={18} />;
    default: return <Zap size={18} />;
  }
};
