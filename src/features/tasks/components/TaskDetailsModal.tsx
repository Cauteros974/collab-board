import React, {useState} from "react";
import MarkDownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import { useTaskStore } from "../store";
import { type Task } from "../types";
import styles from './TaskDetails.module.css';

const md = new MarkDownIt();

interface Props {
    taskId: string | null;
    onClose: () => void;
}

export const TaskDetailsModal: React.FC<Props> = ({ taskId, onClose }) => {
    const task = useTaskStore(state => state.tasks.find(t => t.id === taskId));
    const updateTask = useTaskStore(state => state.updateTask); //To add in store
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(task ?.description || '');

    if(!task || !taskId) return null;

    const handleSave = () => {
        updateTask(taskId, { description });
        setIsEditing(false);
    };

    const renderMarkdown = (text: string) => {
        const rawHtml = md.render(text || '*No description*');
        return { __html: DOMPurify.sanitize(rawHtml)};
    };
    
    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{task.title}</h2>
                <span className={`badge badge-${task.status}`}>{task.status}</span>

                <div className="description-section" style={{marginTop: 20}}>
                    <h3>No Description</h3>
                    {isEditing ? (
                        <div>
                        <textarea 
                          value={description} 
                          onChange={(e) => setDescription(e.target.value)}
                          rows={6}
                          style={{ width: '100%', padding: 10 }}
                          placeholder="Supports Markdown: **bold**, - list..."
                        />
                        <button onClick={handleSave}>Save</button>
                      </div>
                    ):(
                        <div 
                            className="markdown-preview"
                            onClick={() => setIsEditing(true)}
                            dangerouslySetInnerHTML={renderMarkdown(task.description || '')}
                            style={{ cursor: 'pointer', padding: 10, border: '1px dashed #ccc' }}
                        />
                    )}
                </div>

                <div className="comments-section" style={{ marginTop: 30, borderTop: '1px solid #eee' }}>
                    <h3>Comments (Demo)</h3>
                    <div style={{background: '#f4f5f7', padding: 10, borderRadius: 8}}>
                        <strong>User 1:</strong> Excellent task, I'll get started!
                    </div>
                </div>
            </div>
        </div>
    );
};
