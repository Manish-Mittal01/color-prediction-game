import React, { useState } from 'react'
import { BsFillKeyFill, BsPhone } from 'react-icons/bs'
import { SiGooglemessages } from 'react-icons/si'
import { getOtp, verifyOtp } from '../Register/Register'
import '../Register/Register.css';
import axios from '../../axios/axios';



const Resetpassword = () => {
    const [user, setUser] = useState({
        mobile: '',
        otp: '',
        password: "",
        recommendation_code: ""
    });
    const [err, setErr] = useState();
    const [otpBtn, setOtpBtn] = useState();

    return (
        <>
            {/* nav */}
            <div className='nav_login'>
                <div className='sections_login'>
                    <span style={{ marginLeft: 14 }} className='nav_path'>Reset Password</span>
                </div>
            </div>
            {/* end */}
            <div style={{ margin: 14 }} className='padd_cus'>
                <div style={{ marginBottom: otpBtn === 1 ? 4 : "" }} className='fild_input'>
                    <span style={{ marginRight: "10px" }}><BsPhone /></span>
                    <input
                        className="signupField"
                        id="username"
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
                    (otpBtn === 1 && err) &&
                    <p style={{ color: 'red', paddingLeft: 10 }} >{"*"}{err}</p>
                }
                <div className='d-flex'>
                    <div className='fild_input_1'>
                        <div className="special_box">
                            <span style={{ marginRight: "10px" }}><SiGooglemessages /></span>
                            <input
                                className="signupField"
                                id="username"
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
                        <button onClick={() => {
                            getOtp({ user, setErr, setOtpBtn, mode: "reset password" })
                        }} style={{ width: "100%" }} className='w-100'>get otp</button>
                    </div>
                </div>

                <div className='fild_input'>
                    <span style={{ marginRight: "10px" }}><BsFillKeyFill /></span>
                    <input
                        className="signupField"
                        id="username"
                        type="password"
                        placeholder="Password"
                        style={{ outline: 'none', border: "none" }}
                        onChange={(e) => setUser({
                            ...user,
                            password: e.target.value
                        })}
                    />
                </div>
                {
                    (otpBtn === 0 && err) &&
                    <p className='err' >{err.err}</p>
                }
                <div className="input_box_btn">
                    <button onClick={() => verifyOtp({ user, setErr, setOtpBtn, mode: "reset password" })} className="login_btn ripple">Continue</button>
                </div>
            </div>
        </>
    )
}

export default Resetpassword
