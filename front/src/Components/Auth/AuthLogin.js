import jwt from 'jwt-decode';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthLogin({ Comp }) {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user") && jwt(JSON.parse(localStorage.getItem("user")).token).userId;

    useEffect(() => {
        let user = localStorage.getItem("authToken");
        if (user && userId) {
            navigate("/");
        }
    }, [])


    return (
        <>
            <Comp />
        </>
    )
}
