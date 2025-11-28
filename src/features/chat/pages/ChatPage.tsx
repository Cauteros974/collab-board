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
                            padding: '12px 16px',
                            borderRadius: '12px',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Field*/}
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px'}}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Write message..."
                    style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '10px solid #ccc',
                        outline: 'none'
                    }}
                />
            </form>
        </div>
    )
} ;