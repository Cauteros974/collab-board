import React, { useState } from 'react';
import { useGroupStore } from '../store';
import { Button } from '../../../components/ui/Button/Button/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGroupModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const createGroup = useGroupStore(state => state.createGroup);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createGroup(name, desc);
    setName('');
    setDesc('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
      backdropFilter: 'blur(2px)'
    }} onClick={onClose}>
      <div 
        style={{ background: 'var(--color-bg-primary)', padding: 24, borderRadius: 12, width: 400 }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{ marginTop: 0, color: 'var(--color-text-primary)' }}>Create group</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Group name</label>
            <input 
              value={name} onChange={e => setName(e.target.value)}
              placeholder="For example, Marketing Team"
              autoFocus
              style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Description ( optional)</label>
            <textarea 
              value={desc} onChange={e => setDesc(e.target.value)}
              placeholder="What is this group for?"
              rows={3}
              style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc' }} 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!name.trim()}>Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
};