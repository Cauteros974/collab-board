import React from 'react';
import { useForm, Watch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTaskStore } from '../store';
import { Button } from '../../../components/ui/Button/Button/Button';
import { type Status, type Priority } from '../types';

//Validation Scheme
const taskSchema = z.object({
    title: z.string().min(2, 'Minimum 2 characters').max(50, 'Maximum 50'),
    description: z.string().optional(),
    status: z.enum(['todo', 'in-progress', 'done']),
    priority: z.enum(['low', 'medium', 'high']),
    tags: z.array(z.string())
});

type TaskFormValues = z.infer<typeof taskSchema>;

//Tags available for selection
const AVAILABLE_TAGS = ['Design', 'Dev', 'Bug', 'Marketing', 'Urgent', 'Feature'];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTaskModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const addTask = useTaskStore((state) => state.addTask);
  
  //Hook Form
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: { 
      status: 'todo',
      priority: 'medium',
      tags: []
    }
  });

  const selectedTags = watch('tags');

  const toggleTag = (tag: string) => {
    const currentTags = selectedTags || [];
    if(currentTags.includes(tag)) {
      setValue('tags', currentTags.filter(t => t !== tag));
    } else{
      setValue('tags', [...currentTags, tag]);
    }
  };

  const onSubmit = (data: TaskFormValues) => {
    addTask({
      title: data.title,
      description: data.description || '',
      status: data.status as Status,
      priority: data.priority as Priority,
      tags: data.tags || []
    });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      backdropFilter: 'blur(3px)'
    }}>
      <div style={{
        background: 'var(--color-bg-primary)', padding: 24, borderRadius: 12, width: 450,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: 20 }}>New task</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          
          
          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Title</label>
            <input 
              {...register('title')} 
              placeholder='For example, Layout the header'
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} 
            />
            {errors.title && <span style={{ color: 'red', fontSize: 12 }}>{errors.title.message}</span>}
          </div>

          <div style={{display: 'flex', gap: 20 }}>
            <div style={{ flex: 1}}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Status</label>
              <select {...register('status')} style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ddd'  }}>
                <option value="todo">To be fulfilled</option>
                <option value="in-progress">At work</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{display: 'block', marginBottom: 6, fontWeight: 500}}>Priority</label>
              <select {...register('priority')} style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ddd' }}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/*Tags (Click to select)*/}
          <div>
            <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>Tags</label>
            <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
              {AVAILABLE_TAGS.map(tag => {
                const isSelected = selectedTags?.includes(tag);
                return(
                  <button 
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: '6px 20px',
                      borderRadius:'20px',
                      border: isSelected ? '1px solid var(--color-primary)' : '1px solid #ddd',
                      background: isSelected ? 'white' : 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      fontSize: '12px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
};