import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { useAuthStore } from '../../../features/auth/store';
import { useGroupStore } from '../../../features/groups/store';
import { CreateGroupModal } from '../../../features/groups/components/CreateGroupModal';
import { 
    FaColumns, 
    FaCommentDots, 
    FaChartPie, 
    FaMoon, 
    FaSun, 
    FaSignOutAlt,
    FaPlus,
    FaUsers,
    FaTrash
} from 'react-icons/fa';
import clsx from 'clsx';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuthStore();
    const { groups, activeGroupId, setActiveGroup, deleteGroup } = useGroupStore();
    const navigate = useNavigate();
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDeleteGroup = (e: React.MouseEvent, groupId: string) => {
        e.stopPropagation();
        if (groupId === 'default') {
            return;
        }
        if (window.confirm('Are you sure you want to delete this group?')) {
            deleteGroup(groupId);
        }
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

                {/* Groups Section */}
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '0 12px',
                        marginBottom: '8px'
                    }}>
                        <span style={{ 
                            fontSize: '12px', 
                            fontWeight: 600, 
                            color: 'var(--color-text-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Groups
                        </span>
                        <button
                            onClick={() => setCreateModalOpen(true)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-primary)',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '14px'
                            }}
                            title="Create new group"
                        >
                            <FaPlus />
                        </button>
                    </div>

                    {/* Groups List */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '4px',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        paddingRight: '4px'
                    }}>
                        {groups.map(group => (
                            <div
                                key={group.id}
                                onClick={() => setActiveGroup(group.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px 12px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    background: activeGroupId === group.id 
                                        ? 'var(--color-primary)' 
                                        : 'transparent',
                                    color: activeGroupId === group.id 
                                        ? 'white' 
                                        : 'var(--color-text-primary)',
                                    transition: 'all 0.2s',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeGroupId !== group.id) {
                                        e.currentTarget.style.background = 'var(--color-bg-secondary)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeGroupId !== group.id) {
                                        e.currentTarget.style.background = 'transparent';
                                    }
                                }}
                            >
                                <FaUsers style={{ fontSize: '22px', flexShrink: 0 }} />
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ 
                                        fontSize: '13px', 
                                        fontWeight: 500,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {group.name}
                                    </div>
                                    {group.description && (
                                        <div style={{ 
                                            fontSize: '11px', 
                                            opacity: 0.8,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {group.description}
                                        </div>
                                    )}
                                </div>
                                {group.id !== 'default' && (
                                    <button
                                        onClick={(e) => handleDeleteGroup(e, group.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: activeGroupId === group.id 
                                                ? 'rgba(255,255,255,0.7)' 
                                                : 'var(--color-danger)',
                                            padding: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            opacity: 0.6,
                                            transition: 'opacity 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                                        title="Delete group"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
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

                {/* Bottom buttons */}
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

            {/* Create Group Modal */}
            <CreateGroupModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setCreateModalOpen(false)} 
            />
        </div>
    );
};