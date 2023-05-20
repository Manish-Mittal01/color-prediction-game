import jwt from 'jwt-decode';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthLogin({ Comp }) {
    const navigate = useNavigate();
    const userId = localStorage.getItem("winmallUser") && jwt(JSON.parse(localStorage.getItem("winmallUser")).token).userId;

    useEffect(() => {
        let user = localStorage.getItem("winmallUser");
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
