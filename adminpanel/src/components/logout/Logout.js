import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../login/Login';

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear();
        navigate("/login")
    }, []);

    return (
        <>
            <Login />
        </>
    )
}
