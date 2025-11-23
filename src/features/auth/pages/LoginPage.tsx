import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";

export const LoginPage = () => {
    const [name, setName] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
}