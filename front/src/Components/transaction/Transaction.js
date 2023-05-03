import jwt from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios/axios'
import { blockUser } from '../../common/blockUser'
import Transaction_card from './Transaction_card'
import userId from '../../common/userId'

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const userData = userId();

    useEffect(() => {
        if (!userData) return navigate("/login");
        axios.get(`user/transactions?userId=${userId}`)
            .then(resp => {
                setTransactions(resp.data.data)

            })
            .catch(err => {
                err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate })
            })
    }, []);


    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div><span style={{ marginLeft: 14 }} className='nav_path'>Transactions</span></div>
                </div>
            </div>

            {/* r_box */}

            {
                transactions.length > 0 &&
                transactions.map((item) => (
                    <Transaction_card key={item.userId} item={item} />

                ))
            }
        </>
    )
}

export default Transactions