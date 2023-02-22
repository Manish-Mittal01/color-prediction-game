import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthLogin({ Comp }) {
    const navigate = useNavigate()

    useEffect(() => {
        let user = localStorage.getItem("authToken");
        if (user) {
            navigate("/");
        }
    }, [])


    return (
        <>
            <Comp />
        </>
    )
}
