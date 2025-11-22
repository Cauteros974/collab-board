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
}