import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTaskStore } from '../store';
import { Button } from '../../../components/ui/Button/Button/Button';
import { type Status } from '../types';

//Validation scheme
const taskSchema = z.object({
    title: z.string().min(2, 'Minimum 2 characters').max(50, 'Maximum 50'),
    description: z.string().optional(),
    status: z.enum(['todo', 'in-progress', 'done']),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTaskModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const addTask = useTaskStore((state) => state.addTask);
  
  //Hook form
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: { status: 'todo' }
  });

  const onSubmit = (data: TaskFormValues) => {
    addTask(data.title, data.status as Status);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'var(--color-bg-primary)', padding: 24, borderRadius: 12, width: 400
      }}>
        <h2>Новая задача</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Заголовок</label>
            <input 
              {...register('title')} 
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} 
            />
            {errors.title && <span style={{ color: 'red', fontSize: 12 }}>{errors.title.message}</span>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Статус</label>
            <select {...register('status')} style={{ width: '100%', padding: 8 }}>
              <option value="todo">К выполнению</option>
              <option value="in-progress">В работе</option>
              <option value="done">Готово</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
            <Button type="button" variant="secondary" onClick={onClose}>Отмена</Button>
            <Button type="submit">Создать</Button>
          </div>

        </form>
      </div>
    </div>
  );
};