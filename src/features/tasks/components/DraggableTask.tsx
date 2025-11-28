import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { type Task, type Priority } from '../types';
import { CSS } from '@dnd-kit/utilities';

interface Props {
    task: Task;
    onClick: () => void;
}

const getPriorityColor = (priority: Priority) => {
    switch (priority) {
        case 'high':
            return'var(--color-danger)'; //Use Red color
        case 'medium':
            return '#ffab00'; //Use Yellow/Orange
        case 'low':
            return 'var(--color-success)'; //Use Green color
        default:
            return '#ccc';
    }
}

export const DraggableTask: React.FC<Props> = ({ task, onClick }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: task.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        padding: '12px',
        backgroundColor: 'var(--color-bg-primary)',
        marginBottom: '10px',
        borderRadius: '6px',
        boxShadow: isDragging 
        ? '0 5px 15px rgba(0,0,0,0.15)' // Drop shadow
        : 'var(--shadow-sm)', // A regular shadow
        border: '1px solid rgba(0,0,0,0.05)',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px',
        transition: 'box-shadow 0.2s, opacity 0.2s',
    };

    return(
        <div ref = {setNodeRef} style={style} {...listeners} {...attributes} onClick={onClick}>

            <div style = {{ display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span 
                    title={`Priority: ${task.priority.toUpperCase()}`}
                    style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%'
                    }}
                />
            </div>

            {/*Task title*/}
            <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-text-primary)' }}>
                {task.title || 'Untitled'}
            </div>

            {/*Bottom panel with ID and icons*/}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px', 
                color: 'var(--color-text-secondary)',
                marginTop: '4px'
            }}>
                <span style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>
                    #{task.id.slice(0, 4)}
                </span>
                {/* FIX "0" ERROR: Using > 0 */}
                {task.comments && task.comments.length > 0 && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px'}}>
                        💬 {task.comments.length}
                    </span>
                )}
            </div>
        </div>
    );
};