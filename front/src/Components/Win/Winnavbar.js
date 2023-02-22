import React from 'react'
import './Win.css'
import { HiRefresh } from "react-icons/hi";
const Winnavbar = () => {
    return (
        <>
            <div className='balance_nav'>
                <div className='balance'>
                    Available balance:₹
                </div>
                <div className='Recharge'>
                    <div className='Recharge_box'>
                        <button className='recharge_btn'>Recharge</button>
                        <button className='recharge_trend'>Trend</button>
                    </div>
                    <div className='refresh'>
                        <HiRefresh />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Winnavbar