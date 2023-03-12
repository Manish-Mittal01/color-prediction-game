import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserDetails() {
    const [user, setUser] = useState("")
    const navigate = useNavigate();

    const getUserDetails = () => {
        alert("work in progress")
        navigate(`/report?user=${user}`)
    }
    return (
        <div>

            <div data-v-309ccc10="" className="recharge_box">
                <h2 style={{ padding: 10 }} >Enter the Username to get Details</h2>
                <div data-v-309ccc10="" className="input_box">
                    <input
                        onChange={(e) => setUser(e.target.value)}
                        data-v-309ccc10="" type="text" id="username" placeholder="Username or mobile" />
                    {/* <span data-v-309ccc10="" className="tips_span">Username</span> */}
                </div>
                <div data-v-309ccc10="" className="input_box_btn">
                    <button data-v-309ccc10="" onClick={getUserDetails} className="login_btn ripple">Get Details</button></div>

                {/* <div data-v-309ccc10="" className="input_box_btn">
                    <div data-v-309ccc10="" className="two_btn"></div>
                </div> */}
            </div>
        </div>
    )
}
