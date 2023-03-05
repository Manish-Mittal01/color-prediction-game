import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBox({ searchValue, filterResults }) {
    const navigate = useNavigate();

    return (
        <div>
            <input
                value={searchValue}
                style={{ margin: 10, minWidth: 250, height: 30 }}
                onChange={(e) => filterResults(e.target.value)}
                placeholder="Search by username or user code"
                className='searchBox'
            />
            <h2 style={{ textAlign: 'center' }} onClick={() => navigate("/withdrawRecord")} >Withdraw Records</h2>
            <h2 style={{ textAlign: 'center' }} onClick={() => navigate("/rechargeRecord")} >Recharge Records</h2>
        </div>
    )
}
