import React, { useState } from 'react'
import Navlogin from './Navlogin'
import { BsPhone } from "react-icons/bs";
import { BsFillKeyFill } from "react-icons/bs";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios'

const Login = () => {
    const [userDetails, setUserDetails] = useState({
        mobile: "",
        password: ""
    });
    const [err, setErr] = useState("");
    const [user, setUser] = useState("");

    const navigate = useNavigate();

    async function login() {
        const user = userDetails;
        setErr("")
        // if (user.mobile.length !== 10) return setErr("invalid mobile number");

        await axios.post("admin/login", user)
            .then(resp => {
                setUser(resp.data);
                localStorage.setItem("user", JSON.stringify(resp.data));
                navigate("/")
            })
            .catch(err => {
                setErr(err.response.data.message);
            })
    }

    return (
        <>
            <div>
                <Navlogin />
                <div style={{ margin: 14 }} className='padd_cus'>
                    <div className='fild_input'>
                        <span style={{ marginRight: "10px" }}><BsPhone /></span>
                        <input
                            className='signupField'
                            id="username"
                            type="number"
                            placeholder="Mobile Number"
                            style={{ outline: 'none', border: "none" }}
                            onChange={(e) => {
                                setUserDetails({
                                    ...userDetails,
                                    mobile: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div className='fild_input'>
                        <span style={{ marginRight: "10px" }}><BsFillKeyFill /></span>
                        <input
                            className='signupField'
                            id="username"
                            type="password"
                            placeholder="Password"
                            style={{ outline: 'none', border: "none" }}
                            onChange={(e) => {
                                setUserDetails({
                                    ...userDetails,
                                    password: e.target.value
                                })
                            }}
                        />
                    </div>
                    <p className='err' >
                        {err && err}
                    </p>
                    <div className="input_box_btn">
                        <button className="login_btn ripple" onClick={() => login()} >Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login