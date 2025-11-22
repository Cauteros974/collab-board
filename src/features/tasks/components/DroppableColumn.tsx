import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { type Status } from '../types';

interface Props {
    id: Status;
    title: string;
    children: React.ReactNode;
}

export const DroppableColumn: React.FC<Props> = ({ id, title, children }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: id,
    });

    const Style = {
        background: isOver ? 'rgba(0, 82, 204, 0.1)' : 'var(--color-bg-secondary)',
        padding: '16px',
        borderRadius: '12px',
        minHeight: '500px',
        transition: 'background-color 0.2s',
        displey: 'flex',
        flexDirection: 'column' as const,
    };

    return(
        <div ref={setNodeRef} style={style}>
            <h3 style={{
                marginBottom: '16px', 
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
                textTransform: 'uppercase' as const,
                letterSpacing: '1px',
                fontWeight: 600
            }}>
                {title}
            </h3>
        </div>
    )
}