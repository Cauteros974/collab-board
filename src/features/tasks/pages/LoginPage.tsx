import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store";

export const LoginPage = () => {
    const [name, setName] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        //Save the user in the store
        login(name);

        //Redirect to the Dashboard
        navigate('/board');
    };

    return(
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'var(--color-bg-secondary)',
            padding: '20px'
        }}>
            <form
                onSubmit={handleSubmit} 
                style={{ 
                  background: 'var(--color-bg-primary)', 
                  padding: '40px', 
                  borderRadius: '12px', 
                  width: '100%',
                  maxWidth: '400px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '30px'}}>
                    <h2 style={{ color: 'var(--color-primary)', margin: 0, fontSize: '24px' }}>LogIn CollabBoard</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>Please enter your name to continue</p>
                </div>
                
                <div style={{ marginBottom: '20px'}}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px'}}>
                        Your Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="For example, Alex"
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px', 
                            border: '1px solid #ddd',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                    >
                    </input>
                </div>
            </form>
        </div>
    )
}