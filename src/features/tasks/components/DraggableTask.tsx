import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { type Task, type Priority } from '../types'; 
import { FaTrashAlt } from 'react-icons/fa';

interface Props {
  task: Task;
  onClick: () => void;
  onDelete: (taskId: string) => void; 
}

// Helper for getting priority color
const getPriorityColor = (priority?: Priority): string => {
    switch (priority) {
        case 'high': return 'var(--color-danger)'; 
        case 'medium': return '#ffab00'; 
        case 'low': return 'var(--color-success)'; 
        default: return '#ccc';
    }
}

// Helper for color tags
const getTagStyle = (tag: string) => {
  const normalizedTag = tag.toLowerCase();

  if(normalizedTag.includes('design')) return {bg: '#e3f2fd', text: '#0d47a1'}; //blue
  if(normalizedTag.includes('dev')) return {bg: '#e8f5e9', text: '#1b5e20'}; //green
  if(normalizedTag.includes('bug') || normalizedTag.includes('fix')) return { bg: '#ffebee', text: '#b71c1c' }; //red
  if(normalizedTag.includes('marketing')) return {bg: '#f3e5f5', text: '#4a148c'}; //violet
  if (normalizedTag.includes('urgent') || normalizedTag.includes('asap')) return { bg: '#fff3e0', text: '#e65100' }; // orange
}

// Date formatting
const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        day: 'numeric', 
        month: 'short'
    }).replace('.', '');
}



export const DraggableTask: React.FC<Props> = ({ task, onClick, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  // Safely gaining priority
  const priority = task.priority || 'low';
  const priorityLabel = priority.toUpperCase();

  const style: React.CSSProperties = {
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
    flexDirection: 'column',
    gap: '8px',
    transition: 'box-shadow 0.2s, transform 0.2s',
    position: 'relative',
  };

  // Delete handler
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (window.confirm(`Are you sure you want to delete the task "${task.title}"?`)) {
          onDelete(task.id);
      }
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} onClick={onClick}>
      
      {/* Delete handler */}
      <button
          onClick={handleDeleteClick}
          title="Delete task"
          className="delete-button"
          style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              padding: '4px',
              opacity: 0.5,
              transition: 'opacity 0.2s, color 0.2s',
              zIndex: 10,
          }}
          onMouseEnter={(e) => { 
              e.currentTarget.style.opacity = '1'; 
              e.currentTarget.style.color = 'var(--color-danger)'; 
          }}
          onMouseLeave={(e) => { 
              e.currentTarget.style.opacity = '0.5'; 
              e.currentTarget.style.color = 'var(--color-text-secondary)'; 
          }}
      >
          <FaTrashAlt size={12} />
      </button>

      {/* Top: Priority and Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '24px' }}>
          {/* Priority indicator */}
          <span 
              title={`Priority: ${priorityLabel}`}
              style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: getPriorityColor(priority), 
                  flexShrink: 0 
              }} 
          />
          {/* Priority indicator */}
          <div style={{ 
              fontWeight: 600, 
              fontSize: '15px', 
              color: 'var(--color-text-primary)', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap' 
          }}>
              {task.title || 'Untitled'}
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
            <span title={`Created: ${new Date(task.createdAt).toLocaleString()}`}>
              🗓️ {formatDate(task.createdAt)}
            </span>
        </div>
        
        {/* Comments and Artist */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Comments */}
            {task.comments && task.comments.length > 0 && (
              <span 
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }} 
                  title={`${task.comments.length} comments`}
              >
                💬 {task.comments.length}
              </span>
            )}

            {/* Performer (Assignee) */}
            {task.assignee && (
                <img 
                    src={task.assignee.avatar} 
                    alt={task.assignee.name} 
                    title={`Responsible: ${task.assignee.name}`}
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