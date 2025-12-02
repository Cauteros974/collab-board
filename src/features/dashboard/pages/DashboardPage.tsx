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
            <h2>Dashboard project</h2>

            {/*Statistics cards*/}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
                <div className="stats-card" style={{background: 'var(--color-bg-primary)', padding: 20, borderRadius: 8}}>
                    <h3>Total tasks</h3>
                    <p style={{fontSize: 32, fontWeight: 'bold', color: 'var(--color-success)'}}>{progress}%</p>
                </div>
            </div>

            {/*Schedule*/}
            <div style={{ height: 400, background: 'var(--color-bg-primary)', padding: 20, borderRadius: 8 }}>
                <h3>Distribution by status</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
                        <YAxis stroke="var(--color-text-secondary" allowDecimals={false}/>
                        <Tooltip
                            contentStyle={{backgroundColor: 'var(--color-bg-primary)', borderRadius: 8}}
                            cursor = {{fill: 'transport'}}
                        />

                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};