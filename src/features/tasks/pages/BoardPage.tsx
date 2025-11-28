import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { useTaskStore } from '../store';
import { type Status } from '../types';
import { DraggableTask } from '../components/DraggableTask'; 
import { DroppableColumn } from '../components/DroppableColumn';
import { CreateTaskModal } from '../components/CreateTaskModal';
import { TaskDetailsModal } from '../components/TaskDetailsModal';

export const BoardPage = () => {
  const { tasks, moveTask } = useTaskStore();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isCreateOpen, setCreateOpen] = useState(false);

  const handleDragEnd = (e: DragEndEvent) => {
    if (e.over && e.active.id !== e.over.id) {
      moveTask(e.active.id as string, e.over.id as Status);
    }
  };

  const columns: { id: Status; title: string }[] = [
    
  ];

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ marginBottom: 20 }}>
         <button onClick={() => setCreateOpen(true)} style={{ padding: '10px 20px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 4 }}>+ New Task</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {['todo', 'in-progress', 'done'].map(status => (
          <DroppableColumn key={status} id={status} title={status.toUpperCase()}>
            {tasks.filter(t => t.status === status).map(t => (
              <div key={t.id} onClick={() => setSelectedTask(t.id)}>
                <DraggableTask task={t} onClick={() => setSelectedTask(t.id)} />
              </div>
            ))}
          </DroppableColumn>
        ))}
      </div>
      <CreateTaskModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} />
      {selectedTask && <TaskDetailsModal taskId={selectedTask} onClose={() => setSelectedTask(null)} />}
    </DndContext>
  );
};