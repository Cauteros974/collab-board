import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { type Task, type Priority } from '../types'; 
import { FaTrashAlt } from 'react-icons/fa';

interface Props {
  task: Task;
  onClick: () => void;
}

// Helper for getting priority color
const getPriorityColor = (priority?: Priority) => {
    switch (priority) {
        case 'high':
            return 'var(--color-danger)'; 
        case 'medium':
            return '#ffab00'; 
        case 'low':
            return 'var(--color-success)'; 
        default:
            return '#ccc';
    }
}

// Date formatting
const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        day: 'numeric', 
        month: 'short'
    }).replace('.', '');
}

export const DraggableTask: React.FC<Props> = ({ task, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  // Safely gaining priority
  const priority = task.priority || 'low'; // Default value
  const priorityLabel = priority.toUpperCase();

  const style = {
    transform: CSS.Translate.toString(transform),
    padding: '16px',
    backgroundColor: 'var(--color-bg-primary)',
    marginBottom: '12px',
    borderRadius: '8px',
    boxShadow: isDragging 
      ? '0 10px 25px rgba(0,0,0,0.15)'
      : '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid rgba(0,0,0,0.05)',
    cursor: 'grab',
    opacity: isDragging ? 0.5 : 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    transition: 'box-shadow 0.2s, transform 0.2s',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} onClick={onClick}>
      
      {/* Top: Priority and Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Priority indicator */}
          <span 
              title={`Приоритет: ${priorityLabel}`}
              style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: getPriorityColor(priority), 
                  flexShrink: 0 
              }} 
          />
          {/* Task title */}
          <div style={{ 
            fontWeight: 600, 
            fontSize: '15px', 
            color: 'var(--color-text-primary)', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap' 
          }}>
              {task.title || 'Без названия'}
          </div>
      </div>
      
      {/* Bottom panel with ID, Date, Comments and Artist */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        fontSize: '12px', 
        color: 'var(--color-text-secondary)',
        marginTop: '4px'
      }}>
        {/* ID and Creation Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              background: 'rgba(0,0,0,0.05)', 
              padding: '2px 6px', 
              borderRadius: '4px', 
              fontFamily: 'monospace' 
            }}>
              #{task.id.slice(0, 4)}
            </span>
            <span title={`Создана: ${new Date(task.createdAt).toLocaleString()}`}>
              🗓️ {formatDate(task.createdAt)}
            </span>
        </div>
        
        {/* Comments and Artist */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Комментарии */}
            {task.comments && task.comments.length > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }} 
                    title={`${task.comments.length} комментариев`}>
                💬 {task.comments.length}
              </span>
            )}

            {/* Performer (Assignee) */}
            {task.assignee && (
                <img 
                    src={task.assignee.avatar} 
                    alt={task.assignee.name} 
                    title={`Ответственный: ${task.assignee.name}`}
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      border: '1px solid #ddd' 
                    }}
                />
            )}
        </div>
      </div>
    </div>
  );
};