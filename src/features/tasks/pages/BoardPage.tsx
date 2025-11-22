import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useTaskStore } from '../store';
import { type Status } from '../types';
import { Button } from '../../../components/ui/Button/Button/Button';
import { CreateTaskModal } from '../components/CreateTaskModal';
import { DroppableColumn } from '../components/DroppableColumn';
import { DraggableTask } from '../components/DraggableTask';

export const BoardPage = () => {
  const { tasks, moveTask } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Drag completion logic
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // active.id - ID tasks
      // over.id - This is the column ID (because we made the columns drop zones)
      
      // Checking if over.id is a valid status
      const newStatus = over.id as Status;
      moveTask(active.id as string, newStatus);
    }
  };

  const handleTaskClick = (taskId: string) => {
    console.log('Task clicked:', taskId);
  };

  const columns: { id: Status; title: string }[] = [
    { id: 'todo', title: 'To be carried out' },
    { id: 'in-progress', title: 'In progress' },
    { id: 'done', title: 'Ready' },
  ];

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h1>Kanban Board</h1>
          <Button onClick={() => setIsModalOpen(true)}>+ Add a task</Button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '20px', 
          height: '100%',
          alignItems: 'start' 
        }}>
          {columns.map((col) => (
            <DroppableColumn key={col.id} id={col.id} title={col.title}>
              {tasks
                .filter((task) => task.status === col.id)
                .map((task) => (
                  <DraggableTask 
                    key={task.id} 
                    task={task}
                    onClick={() => handleTaskClick(task.id)}
                  />
                ))}
              {/* An empty block so that the column doesn't collapse if there are no tasks */}
              {tasks.filter(t => t.status === col.id).length === 0 && (
                <div style={{ height: 50, border: '2px dashed #ccc', borderRadius: 6, opacity: 0.5 }} />
              )}
            </DroppableColumn>
          ))}
        </div>

        <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </DndContext>
  );
};