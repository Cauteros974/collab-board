import React, { useState } from 'react';
import { useAuthStore } from '../../auth/store';

export const ChatPage = () => {
    const user = useAuthStore((state) => state.user);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello everyone! How is the project going??', author: 'System', time: '10:00' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages([
            ...messages,
            {
                id: Date.now(),
                text: input,
                author: user?.name || 'Guest',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ]);
        setInput('');
    };

    return(
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 40px)'}}>
            <h2 style={{marginBottom: '20px'}}>Team Chat</h2>
        </div>
    )
} ;