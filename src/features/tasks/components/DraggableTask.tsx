import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { type Task } from '../types';
import { CSS } from '@dnd-kit/utilities';

interface Props {
    task: Task;
    onClick: () => void;
}