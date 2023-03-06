import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios'

export default function BlockUser() {
    const [user, setUser] = useState("");
    const [err, setErr] = useState({})

    function blockUser() {
        const userDetails = {
            mobile: user,
            userStatus: 'blocked'
        }
        axios.post("admin/blockUser", userDetails)
            .then(resp => {
                setErr({});
                setUser("")
                alert("user blocked successfully")
                console.log(resp.data)
            })
            .catch(err => {
                err.response && setErr(err.response.data)
                console.log(err)
            })
    }
    console.log(err)

    return (
        <div>
            <div data-v-309ccc10="" className="recharge">
                <div data-v-309ccc10="" className="recharge_box">
                    <h2 style={{ padding: 10 }}>Enter the Username to get Details</h2>
                    <div data-v-309ccc10="" className="input_box">
                        <input onChange={(e) => setUser(e.target.value)} data-v-309ccc10="" type="text" id="username" placeholder="Username" />
                        <span data-v-309ccc10="" className="tips_span">Username</span>
                    </div>
                    {
                        err.message &&
                        <p style={{ color: 'red', textAlign: 'center' }} >{err.message}</p>
                    }

                    <div data-v-309ccc10="" className="input_box_btn">
                        <button data-v-309ccc10="" onClick={() => blockUser()} className="login_btn ripple">Block user</button>
                    </div>

                    <div data-v-309ccc10="" className="input_box_btn">
                        <div data-v-309ccc10="" className="two_btn"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}
