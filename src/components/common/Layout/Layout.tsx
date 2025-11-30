import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { useAuthStore } from '../../../features/auth/store';
import { FaColumns, FaCommentDots, FaChartPie, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import clsx from 'clsx';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return(
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>CollabBoard</div>

                {/* User information */}
                {user && (
                    <div style={{ 
                        padding: '12px', 
                        marginBottom: '20px', 
                        background: 'var(--color-bg-secondary)', 
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <img 
                            src={user.avatar} 
                            alt={user.name}
                            style={{ 
                                width: '36px', 
                                height: '36px', 
                                borderRadius: '50%',
                                border: '2px solid var(--color-primary)'
                            }}
                        />
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div style={{ 
                                fontSize: '14px', 
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {user.name}
                            </div>
                            <div style={{ 
                                fontSize: '11px', 
                                color: 'var(--color-text-secondary)' 
                            }}>
                                Online
                            </div>
                        </div>
                    </div>
                )}

                <nav className={styles.nav}>
                    <NavLink 
                        to="/board" 
                        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
                    >
                        <FaColumns /> Board
                    </NavLink>

                    <NavLink 
                        to="/dashboard" 
                        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
                    >
                        <FaChartPie /> Dashboard
                    </NavLink>

                    <NavLink 
                        to="/chat" 
                        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
                    >
                        <FaCommentDots /> Chat
                    </NavLink>
                </nav>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button 
                        onClick={toggleTheme} 
                        className={styles.navItem} 
                        style={{ 
                            width: '100%', 
                            border: 'none', 
                            background: 'transparent', 
                            cursor: 'pointer'
                        }}
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                        {theme === 'light' ? ' Dark Theme' : ' Light Theme'}
                    </button>

                    <button 
                        onClick={handleLogout} 
                        className={styles.navItem} 
                        style={{ 
                            width: '100%', 
                            border: 'none', 
                            background: 'transparent', 
                            cursor: 'pointer',
                            color: 'var(--color-danger)'
                        }}
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
};