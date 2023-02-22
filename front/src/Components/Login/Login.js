import React, { useState } from 'react'
import Navlogin from './Navlogin'
import { BsPhone } from "react-icons/bs";
import { BsFillKeyFill } from "react-icons/bs";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
const Login = () => {
    const [userDetails, setUserDetails] = useState({
        mobile: "",
        password: ""
    });
    const [err, setErr] = useState("");
    const [user, setUser] = useState("")
    const navigate = useNavigate();

    async function login() {
        const user = userDetails;
        setErr("")
        if (user.mobile.length !== 10) return setErr("invalid mobile number");

        await axios.post("user/login", user)
            .then(resp => {
                console.log(resp.data)
                setUser(resp.data);
                localStorage.setItem("authToken", JSON.stringify(user));
                localStorage.setItem("user", JSON.stringify(resp.data));
                navigate("/win");
            })
            .catch(err => {
                console.log(err.response.data)
                setErr(err.response.data.err);
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
                    <p className='err' >{err && err}</p>
                    <div className="input_box_btn">
                        <button onClick={() => login()} className="login_btn ripple">Login</button>
                    </div>
                    <div className="input_box_btn">
                        <div className="two_btn">
                            <button onClick={() => navigate("/register")} className="ripplegrey">Register</button>
                            <button onClick={() => { navigate("/resetpassword") }} className="ripplegrey">Forgot Password?</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login