import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";

export const LoginPage = () => {
    const [name, setName] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name.trim()) return;

        //Save the user in the store
        login(name);

        //Redirect to the board
        navigate('/board');
    };

    return(
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg-primary)',
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
                    <h2 style={{ color: 'var(--color-primary)', margin: 0, fontSize: '24px' }}>LogIn to CollabBoard</h2>
                    <p style={{ color: 'var(--color-text-secondary', marginTop: '8px'}}>Please enter your name to continue</p>
                </div>

                <div style={{marginBottom: '20px'}}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>
                    Your Name
                </label>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>

            </form>
        </div>
    )
}