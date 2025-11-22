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
    }