import React from "react";
import { Outlet, NavLink } from 'react-router-dom';
import { Facolumns, FaChartPie, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../../features/auth/store';

export const Layout = () => {
    const {user, logout} = useAuthStore();

    return(
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', height: '100vh' }}>
            <aside style={{ background: 'var(--color-bg-secondary)', padding:20}}
        </div>
    )
}