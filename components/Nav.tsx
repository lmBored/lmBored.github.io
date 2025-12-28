import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav: React.FC = () => {
    return (
        <header className="nav-bar">
            <nav className="nav">
                <NavLink
                    to="/"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                    About
                </NavLink>
                <NavLink
                    to="/blog"
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                    Blog
                </NavLink>
            </nav>
            {/* <span className="site-title">Khoi Nguyen</span> */}
        </header>
    );
};
