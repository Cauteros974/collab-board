import React from "react";
import { Outlet, NavLink } from 'react-router-dom';
import { Facolumns, FaChartPie, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../../features/auth/store';

export const Layout = () => {
    const {user, logout} = useAuthStore();

    return(
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', height: '100vh' }}>
            <aside style={{ background: 'var(--color-bg-secondary)', padding:20, borderRight: '1px solid #ddd'}}>
                <h2 style={{ color: 'var(--color-primary)', }}>CollabBoard</h2>
                <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <NavLink to="/board" style={{isActive}} => </div>></NavLink>
                </div>
                
            </aside>
        </div>
    )
}