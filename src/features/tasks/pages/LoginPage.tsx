import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store";

export const LoginPage = () => {
    const [name, setName] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const hadleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        //Save the user in the store
        login(name),

        //Redirect to the Dashboard
    }
}