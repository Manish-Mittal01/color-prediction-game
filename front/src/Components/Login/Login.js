import React, { useEffect, useState } from 'react'
import Navlogin from './Navlogin'
import { BsPhone } from "react-icons/bs";
import { BsFillKeyFill } from "react-icons/bs";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import jwt from 'jwt-decode';

const Login = () => {
    const [userDetails, setUserDetails] = useState({
        mobile: "",
        password: ""
    });
    const [err, setErr] = useState("");
    const [user, setUser] = useState("");
    const [userLoginIP, setUserLoginIP] = useState("");
    const [disableLogin, setDisableLogin] = useState(false);

    const navigate = useNavigate();

    async function login() {
        setDisableLogin(true)
        const user = {
            ...userDetails,
            loginIP: userLoginIP
        };
        setErr("")
        if (user.mobile.length !== 10) return setErr("invalid mobile number");

        await axios.post("user/login", user)
            .then(resp => {
                setUser(resp.data);
                localStorage.setItem("winmallUser", JSON.stringify(resp.data));
                navigate("/win");
                userWallet(jwt(resp.data.token).userId)
            })
            .catch(err => {
                setErr(err?.response?.data?.message);
            })

        setDisableLogin(false)
    }

    function userWallet(userId) {
        axios.get(`user/wallet?userId=${userId}`)
            .then(resp => {
                let data = resp.data.data
                let walletDetails = {
                    totalAmount: data.totalAmount,
                    referralAmount: data.referralAmount,
                    withdrawableAmount: data.withdrawableAmount
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get("https://api.ipify.org?format=json")
            .then(resp => {
                setUserLoginIP(resp.data.ip)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div style={{ marginBottom: 55 }}>
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
                    <button disabled={disableLogin} onClick={() => login()} className="login_btn ripple">Login</button>
                </div>
                <div className="input_box_btn">
                    <div className="two_btn">
                        <button onClick={() => navigate("/register")} className="ripplegrey">Register</button>
                        <button onClick={() => { navigate("/resetpassword") }} className="ripplegrey">Forgot Password?</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login