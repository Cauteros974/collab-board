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

    if(!task || taskId) return null;

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

                
            </div>
        </div>
    )
}
