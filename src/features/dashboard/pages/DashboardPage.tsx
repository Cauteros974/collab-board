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
    ]
}