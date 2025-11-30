import React, { useState } from "react";
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import { useTaskStore } from "../store";
import { useAuthStore } from "../../auth/store";
import { type Task } from "../types";

const md = new MarkdownIt();

interface Props {
    taskId: string | null;
    onClose: () => void;
}

export const TaskDetailsModal: React.FC<Props> = ({ taskId, onClose }) => {
    const task = useTaskStore(state => state.tasks.find(t => t.id === taskId));
    const updateTask = useTaskStore(state => state.updateTask);
    const addComment = useTaskStore(state => state.addComment);
    const user = useAuthStore(state => state.user);
    
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(task?.description || '');
    const [commentText, setCommentText] = useState('');

    if (!task || !taskId) return null;

    const handleSave = () => {
        updateTask(taskId, { description });
        setIsEditing(false);
    };

    const handleAddComment = () => {
        if (!commentText.trim() || !user) return;
        
        addComment(taskId, {
            id: `comment-${Date.now()}`,
            text: commentText,
            author: user,
            createAd: new Date().toISOString()
        });
        setCommentText('');
    };

    const renderMarkdown = (text: string) => {
        const rawHtml = md.render(text || '*No description*');
        return { __html: DOMPurify.sanitize(rawHtml) };
    };
    
    return (
        <div 
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                backdropFilter: 'blur(3px)'
            }}
            onClick={onClose}
        >
            <div 
                style={{
                    background: 'var(--color-bg-primary)',
                    padding: 24,
                    borderRadius: 12,
                    width: 600,
                    maxHeight: '85vh',
                    overflow: 'auto',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 20 }}>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, marginBottom: 8, fontSize: 24 }}>{task.title}</h2>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{
                                padding: '4px 12px',
                                borderRadius: 6,
                                background: 'var(--color-bg-secondary)',
                                fontSize: 12,
                                fontWeight: 500,
                                textTransform: 'capitalize'
                            }}>
                                {task.status.replace('-', ' ')}
                            </span>
                            <span style={{
                                padding: '4px 12px',
                                borderRadius: 6,
                                background: task.priority === 'high' ? 'var(--color-danger)' :
                                           task.priority === 'medium' ? '#ffab00' : 'var(--color-success)',
                                color: 'white',
                                fontSize: 12,
                                fontWeight: 500,
                                textTransform: 'capitalize'
                            }}>
                                {task.priority}
                            </span>
                            {task.tags?.map((tag, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        padding: '4px 12px',
                                        borderRadius: 12,
                                        background: 'var(--color-bg-secondary)',
                                        fontSize: 11
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: 28,
                            cursor: 'pointer',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Description Section */}
                <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Description</h3>
                    {isEditing ? (
                        <div>
                            <textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                rows={8}
                                style={{ 
                                    width: '100%', 
                                    padding: 12, 
                                    borderRadius: 6,
                                    border: '1px solid #ddd',
                                    fontSize: 14,
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                                placeholder="Supports Markdown: **bold**, *italic*, - list..."
                            />
                            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                <button 
                                    onClick={handleSave}
                                    style={{
                                        padding: '8px 16px',
                                        background: 'var(--color-primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 6,
                                        cursor: 'pointer',
                                        fontWeight: 500
                                    }}
                                >
                                    Save
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsEditing(false);
                                        setDescription(task.description || '');
                                    }}
                                    style={{
                                        padding: '8px 16px',
                                        background: 'transparent',
                                        color: 'var(--color-text-secondary)',
                                        border: '1px solid #ddd',
                                        borderRadius: 6,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div 
                            onClick={() => setIsEditing(true)}
                            dangerouslySetInnerHTML={renderMarkdown(task.description || '')}
                            style={{ 
                                cursor: 'pointer', 
                                padding: 12, 
                                border: '1px dashed #ddd',
                                borderRadius: 6,
                                minHeight: 60,
                                background: 'var(--color-bg-secondary)',
                                fontSize: 14,
                                lineHeight: 1.6
                            }}
                        />
                    )}
                </div>

                {/* Comments Section */}
                <div style={{ borderTop: '1px solid #eee', paddingTop: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
                        Comments ({task.comments?.length || 0})
                    </h3>

                    {/* Existing Comments */}
                    {task.comments && task.comments.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                            {task.comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    style={{
                                        padding: 12,
                                        background: 'var(--color-bg-secondary)',
                                        borderRadius: 8
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                        <img
                                            src={comment.author.avatar}
                                            alt={comment.author.name}
                                            style={{ width: 24, height: 24, borderRadius: '50%' }}
                                        />
                                        <span style={{ fontWeight: 600, fontSize: 13 }}>{comment.author.name}</span>
                                        <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
                                            {new Date(comment.createAd).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, marginBottom: 16 }}>
                            No comments yet. Be the first to comment!
                        </p>
                    )}

                    {/* Add Comment Form */}
                    {user && (
                        <div>
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..."
                                rows={3}
                                style={{
                                    width: '100%',
                                    padding: 10,
                                    borderRadius: 6,
                                    border: '1px solid #ddd',
                                    fontSize: 13,
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                            />
                            <button
                                onClick={handleAddComment}
                                disabled={!commentText.trim()}
                                style={{
                                    marginTop: 8,
                                    padding: '8px 16px',
                                    background: commentText.trim() ? 'var(--color-primary)' : '#ccc',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 6,
                                    cursor: commentText.trim() ? 'pointer' : 'not-allowed',
                                    fontWeight: 500
                                }}
                            >
                                Add Comment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};