import React from 'react';
import { useTaskStore } from '../store';
import { type Status } from '../types';
import { Button } from '../../../components/ui/Button/Button/Button';
import styles from './BoardPage.module.css';

const COLUMNS: { id: Status; label: string }[] = [
  { id: 'todo', label: 'To be carried out' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'done', label: 'Ready' },
];

export const BoardPage = () => {
  const { tasks, moveTask, addTask } = useTaskStore();

  return (
    <div style={{ padding: '20px', height: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Kanban Board</h1>
        <Button onClick={() => addTask('New Task', 'todo')}>+ Add a task</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', height: 'calc(100% - 100px)' }}>
        {COLUMNS.map((col) => (
          <div key={col.id} style={{ 
            background: 'var(--color-bg-secondary)', 
            padding: '16px', 
            borderRadius: 'var(--border-radius)' 
          }}>
            <h3 style={{ marginBottom: '16px' }}>{col.label}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tasks.filter(t => t.status === col.id).map(task => (
                <div key={task.id} style={{ 
                  background: 'var(--color-bg-primary)', 
                  padding: '12px', 
                  borderRadius: '6px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-radius)' // fallback
                }}>
                  <strong>{task.title}</strong>
                  <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    {/* An example of a very simple status change */}
                    {col.id !== 'done' && (
                      <button onClick={() => moveTask(task.id, 'done')} style={{ marginRight: '5px' }}>
                         Done ->
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};