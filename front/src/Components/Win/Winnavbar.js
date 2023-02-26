import React from 'react'
import './Win.css'
import { HiRefresh } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'

const Winnavbar = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='balance_nav'>
                <div className='balance'>
                    Available balance : ₹
                </div>
                <div className='Recharge'>
                    <div className='Recharge_box'>
                        <button onClick={() => navigate("/recharge")} className='recharge_btn'>Recharge</button>
                    </div>
                    {/* <div className='refresh'>
                        <HiRefresh />
                    </div> */}
                </div>
            </div>

        </>
    )
}

export default Winnavbar