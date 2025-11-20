import React from "react";
import { Outlet, NavLink } from 'react-router-dom';
import { FaColumns, FaChartPie, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../../features/auth/store';

export const Layout = () => {
    const {user, logout} = useAuthStore();

    return(
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', height: '100vh' }}>
            <aside style={{ background: 'var(--color-bg-secondary)', padding:20, borderRight: '1px solid #ddd'}}>
                <h2 style={{ color: 'var(--color-primary)', }}>CollabBoard</h2>
                <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <NavLink to="/board" style={({isActive}) => ({ 
                    padding: 10, textDecoration: 'none', color: isActive ? 'var(--color-primary)' : 'inherit', fontWeight: isActive ? 'bold' : 'normal'
                })}><FaColumns /> Board</NavLink>
                <NavLink to="/dashboard" style={({isActive}) => ({ 
                    padding: 10, textDecoration: 'none', color: isActive ? 'var(--color-primary)' : 'inherit', fontWeight: isActive ? 'bold' : 'normal'
                })}><FaChartPie /> DashBoard</NavLink>
                </div>
                
                <div style={{ marginTop: 'auto', borderTop: '1px solid #ccc', paddingTop: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <img src={user?.avatar} style={{ width: 30, borderRadius: '50%' }} />
                        <span>{user?.name}</span>
                    </div>

                    <button>
                        
                    </button>
                </div>
            </aside>
        </div>
    )
}