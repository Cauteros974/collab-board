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
        }}
    )
}