import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { FaColumns, FaCommentDots, FaChartPie, FaMoon, FaSun } from 'react-icons/fa';
import clsx from 'clsx';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return(
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>CollabBoard</div>

                <nav className={styles.nav}>
                    <NavLink to = "/board" className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}>
                        <FaColumns /> Board
                    </NavLink>

                    <NavLink to="/chat" className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}>
                        <FaCommentDots /> Chat
                    </NavLink>
                </nav>

                <div style={{ marginTop: 'auto'}}>
                    <button onClick={toggleTheme} className={styles.navItem} style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer'}}>
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                        {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
                    </button>
                </div>
            </aside>

            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
};