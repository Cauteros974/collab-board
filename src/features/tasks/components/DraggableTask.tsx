import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { type Task } from '../types';
import { CSS } from '@dnd-kit/utilities';

interface Props {
    task: Task;
    onClick: () => void;
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
        ? '0 5px 15px rgba(0,0,0,0.15)' 
        : 'var(--shadow-sm)',
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
            <div style={{ fontWeight: 500}}>{task.title}</div>
        </div>
    )