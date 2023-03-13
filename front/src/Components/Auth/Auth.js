import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios/axios';
import jwt from 'jwt-decode'

export default function Auth({ Comp }) {
    const navigate = useNavigate();
    const [wallet, setWallet] = useState({});

    const userId = localStorage.getItem("user") && jwt(JSON.parse(localStorage.getItem("user")).token).userId;

    useEffect(() => {
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

    useEffect(() => {
        let user = localStorage.getItem("authToken");
        if (!user) {
            navigate("/login");
        }
    }, []);


    return (
        <>
            <Comp wallet={wallet} />
        </>
    )
}
