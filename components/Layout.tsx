import React from 'react';
import { Outlet } from 'react-router-dom';
import { Nav } from './Nav';
import { ThemeToggle } from './ThemeToggle';

export const Layout: React.FC = () => {
  return (
    <div className="layout">
      <ThemeToggle />

      <div className="container">
        <Nav />

        <main className="main fade-in">
          <React.Suspense fallback={<div className="loading">Loading...</div>}>
            <Outlet />
          </React.Suspense>
        </main>
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} Khoi Nguyen
      </footer>
    </div>
  );
};
