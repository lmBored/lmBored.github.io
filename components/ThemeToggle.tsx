import React, { useEffect, useState } from 'react';
import { Theme } from '../types';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === Theme.DARK);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme(Theme.DARK);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    const next = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === Theme.DARK);
  };

  return (
    <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
      {theme === Theme.LIGHT ? <Sun /> : <Moon color="white" />}
    </button>
  );
};
