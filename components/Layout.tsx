import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="layout">
      <header className="site-header">
        <a href="/">Khoi Nguyen</a>
      </header>

      <div className="container">
        <main className="main">
          <React.Suspense fallback={null}>
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
