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

            {/*Message area*/}
            <div style={{
                flex: 1, 
                background: 'var(--color-bg-secondary)', 
                borderRadius: '12px', 
                padding: '20px', 
                overflowY: 'auto',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{ 
                        alignSelf: msg.author === user?.name ? 'flex-end' : 'flex-start',
                        maxWidth: '70%'
                    }}>
                        <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px', textAlign: msg.author === user?.name ? 'right' : 'left' }}>
                            {msg.author}, {msg.time}
                        </div>
                        <div style={{ 
                            background: msg.author === user?.name ? 'var(--color-primary)' : 'white',
                            color: msg.author === user?.name ? 'white' : 'black',
                        }}>
                            {msg.text}
                        </div>
                    </div>
        ))}
            </div>
        </div>
    )
} ;