import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Auth({ Comp }) {
    const navigate = useNavigate()

    useEffect(() => {
        let user = localStorage.getItem("winmallAdmin");
        if (!user) {
            navigate("/login");
        }
    }, [])


    return (
        <>
            <Comp />
        </>
    )
}
