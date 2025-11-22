import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTaskStore } from "../../tasks/store";

export const DashboardPage = () => {
    const tasks = useTaskStore(state => state.tasks);

    //Preparing data for the graph
    const data = [
        { name: 'To Do', count: tasks.filter(t => t.status === 'todo').length, color: '#ff5630' },
        { name: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length, color: '#0052cc' },
        { name: 'Done', count: tasks.filter(t => t.status === 'done').length, color: '#36b37e' },
    ];

    const totalTasks = tasks.length;
    const progress = totalTasks ? Math.round((tasks.filter(t => t.status === 'done').length / totalTasks) * 100) : 0;

    return(
        <div style={{ padding: 20}}>
            <h1>Dashboard project</h1>

            {/*Statistics cards*/}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
                <div className="stats-card" style={{background: 'var(--color-bg-primary)', padding: 20, borderRadius: 8}}>
                    <h3>Total tasks</h3>
                </div>
            </div>
        </div>
    )
}