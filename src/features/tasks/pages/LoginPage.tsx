import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store";

export const LoginPage = () => {
    const [name, setName] = useState('');
    const login = useAuthStore((state) => state.login);
}