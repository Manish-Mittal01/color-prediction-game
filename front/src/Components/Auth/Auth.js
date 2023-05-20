import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios/axios';
import jwt from 'jwt-decode'

export default function Auth({ Comp }) {
    const navigate = useNavigate();
    const [wallet, setWallet] = useState({});

    const userId = localStorage.getItem("winmallUser") && jwt(JSON.parse(localStorage.getItem("winmallUser")).token).userId;

    useEffect(() => {
        let user = localStorage.getItem("winmallUser");
        if (!user) {
            navigate("/login");
            return;
        }
        axios.get(`user/wallet?userId=${userId}`)
            .then(resp => {
                let { totalAmount, referralAmount, withdrawableAmount, bonusAmount } = resp.data.data
                let walletDetails = {
                    totalAmount,
                    referralAmount,
                    withdrawableAmount,
                    bonusAmount
                };
                setWallet(walletDetails)
            })
            .catch(err => {
                console.log(err)
            });
    }, []);



    return (
        <>
            <Comp wallet={wallet} />
        </>
    )
}
