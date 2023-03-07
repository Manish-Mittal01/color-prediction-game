import React, { useState } from 'react'
import { BsFillKeyFill, BsPhone } from 'react-icons/bs'
import Registernav from './Registernav'
import './Register.css'
import { SiGooglemessages } from "react-icons/si";
import { AiFillAccountBook } from 'react-icons/ai';
import axios from '../../axios/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { blockUser } from '../../common/blockUser';

export const getOtp = ({ user, setErr, setOtpBtn, mode, navigate }) => {
    if (user.mobile.length === 0) {
        setOtpBtn(1)
        return setErr({ err: "enter mobile number" })
    }
    else if (user.mobile.length !== 10) {
        setOtpBtn(1)
        return setErr({ err: "invalid mobile number" });
    }
    axios.post("user/sendOtp", { mobile: user.mobile, mode: mode })
        .then(resp => {
            setErr("")
            setOtpBtn && setOtpBtn("")
            alert("otp sent successfully")
            console.log(resp.data);
        })
        .catch(err => {
            console.log(err)
            setOtpBtn(1)
            setErr(err.response.data);
            err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate })

        })
}

export function verifyOtp({ user, setErr, setOtpBtn, mode, navigate }) {
    setOtpBtn(0);

    const newUser = {
        mobile: user.mobile,
        otp: user.otp,
        mode: mode,
        password: user.password,
        referralCode: user.referralCode
    }
    axios.post("user/sendOtp/verifyOtp", newUser)
        .then(resp => {
            setErr("");
            setOtpBtn("");
            navigate("/login");
            localStorage.clear()
        })
        .catch(err => {
            console.log(err)
            setErr(err.response.data)
            err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate })
        })
}

const Register = () => {
    const referralCode = useLocation().state?.referralCode;
    const [user, setUser] = useState({
        mobile: '',
        otp: '',
        password: "",
        referralCode: referralCode || ""
    });
    const [err, setErr] = useState();
    const [otpBtn, setOtpBtn] = useState();
    const navigate = useNavigate();


    return (
        <>
            <Registernav />
            <div style={{ margin: 14 }} className='padd_cus'>
                <div style={{ marginBottom: otpBtn === 1 ? 4 : "" }} className='fild_input'>
                    <span style={{ marginRight: "10px" }}><BsPhone /></span>
                    <input
                        className='signupField'
                        type="number"
                        placeholder="Mobile Number"
                        style={{ outline: 'none', border: "none" }}
                        onChange={(e) => setUser({
                            ...user,
                            mobile: e.target.value
                        })}
                    />
                </div>
                {
                    (otpBtn === 1 && err.message) &&
                    <p style={{ color: 'red', paddingLeft: 10 }} >{"*"}{err.message}</p>
                }
                <div className='d-flex'>
                    <div className='fild_input_1'>
                        <div className="special_box">
                            <span style={{ marginRight: "10px" }}><SiGooglemessages /></span>
                            <input
                                className='signupField'
                                type="number"
                                placeholder="Verification Code"
                                style={{ outline: 'none', border: "none", width: "100%" }}
                                onChange={(e) => setUser({
                                    ...user,
                                    otp: e.target.value
                                })}
                            />
                        </div>
                    </div>
                    <div className='get_otp'>
                        <button onClick={() => getOtp({ user, setErr, setOtpBtn, mode: "new user", navigate })} style={{ width: "100%" }} className='w-100'>get otp</button>
                    </div>
                </div>

                <div className='fild_input'>
                    <span style={{ marginRight: "10px" }}><BsFillKeyFill /></span>
                    <input
                        className='signupField'
                        type="password"
                        placeholder="Password"
                        style={{ outline: 'none', border: "none" }}
                        onChange={(e) => setUser({
                            ...user,
                            password: e.target.value
                        })}
                    />
                </div>
                <div className='fild_input'>
                    <span style={{ marginRight: "10px" }}><AiFillAccountBook /></span>
                    <input
                        className='signupField'
                        type="text"
                        placeholder="Recommendation Code"
                        style={{ outline: 'none', border: "none" }}
                        value={user.referralCode}
                        onChange={(e) => setUser({
                            ...user,
                            referralCode: e.target.value
                        })}
                    />
                </div>
                {
                    (otpBtn === 0 && err.message) &&
                    <p className='err' >{err.message}</p>
                }
                <div className="input_box_btn">
                    <button onClick={() => {
                        verifyOtp({ user, setErr, setOtpBtn, mode: "new user", navigate })
                    }} className="login_btn ripple">Register</button>
                </div>
            </div>


        </>
    )
}

export default Register