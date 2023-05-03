import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { GrAdd } from "react-icons/gr";
import { getOtp } from '../Register/Register';
import axios from '../../axios/axios'
import { useNavigate } from 'react-router-dom';
import { blockUser } from '../../common/blockUser';
import userId from '../../common/userId';

const Bankcard = () => {
    const [fillDetails, setFillDetails] = useState(false);
    const [err, setErr] = useState({});
    const userMobile = localStorage.getItem("user") && jwt(JSON.parse(localStorage.getItem("user")).token).mobile

    const [bankDetails, setBankDetails] = useState({
        name: "",
        acc_number: "",
        ifsc: "",
        branch: "",
        upi: "",
        mobile: userMobile,
        otp: ""
    });
    const navigate = useNavigate();
    const userData = userId();
    useEffect(() => {
        if (!userData) return navigate("/login");
    });

    const addBank = () => {
        const userId = localStorage.getItem("user") && jwt(JSON.parse(localStorage.getItem("user")).token).userId
        const { name, acc_number, ifsc, branch, upi, mobile, otp } = bankDetails;

        if (!acc_number) {
            if (!upi) return setErr({ bank: "upi or account detail required" });
            else {
                setErr("")
            }
        }
        else if (!ifsc) return setErr({ ifsc: "ifsc code is required" });
        if (!mobile) return setErr({ mobile: "Mobile is required" });
        if (!otp) return setErr({ otp: "otp is required" });

        const userBankDetails = { ...bankDetails, userId: userId }

        axios.post("user/userBank", userBankDetails)
            .then(resp => {
                alert("bank details added successfully");
                navigate("/mine")

            })
            .catch(err => {
                err.response && setErr(err.response.data.message);
                err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate })
            })
    }

    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div><span style={{ marginLeft: 14 }} className='nav_path'>Bank Card</span></div>
                    <div className='d_d'> <span onClick={() => setFillDetails(!fillDetails)} ><GrAdd /></span></div>
                </div>
            </div>

            {
                fillDetails &&
                <div data-v-b351b8b8="" className="input_card">
                    <ul data-v-b351b8b8="" className="card_ul">
                        <li data-v-b351b8b8="">
                            <p data-v-b351b8b8="">Actual Name</p>
                            <input
                                value={bankDetails.name}
                                onChange={(e) => {
                                    setBankDetails({
                                        ...bankDetails,
                                        name: e.target.value
                                    })
                                }} data-v-b351b8b8="" type="text" />
                        </li>
                        <li data-v-b351b8b8="">
                            <p data-v-b351b8b8="">Bank Account Number</p>
                            <input
                                value={bankDetails.acc_number}
                                onChange={(e) => {
                                    setBankDetails({
                                        ...bankDetails,
                                        acc_number: e.target.value
                                    })
                                }} data-v-b351b8b8="" type="text" />
                        </li>
                        <li data-v-b351b8b8="">
                            <p data-v-b351b8b8="">IFSC Code</p>
                            <input
                                value={bankDetails.ifsc}
                                onChange={(e) => {
                                    setBankDetails({
                                        ...bankDetails,
                                        ifsc: e.target.value
                                    })
                                }} data-v-b351b8b8="" type="text" />
                        </li>
                        {
                            err.ifsc &&
                            <span data-v-b351b8b8="" className="tips_span">{err.ifsc}</span>
                        }
                        <li data-v-b351b8b8="">
                            <p data-v-b351b8b8="">Branch</p>
                            <input
                                value={bankDetails.branch}
                                onChange={(e) => {
                                    setBankDetails({
                                        ...bankDetails,
                                        branch: e.target.value
                                    })
                                }} data-v-b351b8b8="" type="text" />
                        </li>
                        <li data-v-b351b8b8="">
                            <p data-v-b351b8b8="">Upi Id</p>
                            <input
                                value={bankDetails.upi}
                                onChange={(e) => {
                                    setBankDetails({
                                        ...bankDetails,
                                        upi: e.target.value
                                    })
                                }} data-v-b351b8b8="" type="text" />
                        </li>
                        <li data-v-b351b8b8="">
                            <p data-v-b351b8b8="">Mobile Number</p>
                            <input
                                value={bankDetails.mobile}
                                onChange={(e) => {
                                    setBankDetails({
                                        ...bankDetails,
                                        mobile: e.target.value
                                    })
                                }} data-v-b351b8b8="" type="text" />
                        </li>
                        {
                            err.mobile &&
                            <span data-v-b351b8b8="" className="tips_span">{err.mobile}</span>
                        }
                        <li data-v-b351b8b8="">
                            <p data-v-b351b8b8="">Code</p>
                            <div data-v-b351b8b8="" style={{ display: 'flex' }}>
                                <input
                                    value={bankDetails.otp}
                                    onChange={(e) => {
                                        setBankDetails({
                                            ...bankDetails,
                                            otp: e.target.value
                                        })
                                    }} data-v-b351b8b8="" type="text" placeholder="Verification Code" style={{ flex: "1 1 0%" }} />
                                {
                                    err.otp &&
                                    <span data-v-b351b8b8="" className="tips_span">{err.otp}</span>
                                }
                                <button id="otpbtn" data-v-b351b8b8="" className="gocode" onClick={() =>
                                    getOtp({ user: bankDetails, setErr, navigate })

                                } > OTP </button>
                            </div>
                        </li>
                    </ul>
                    {
                        err.bank &&
                        <p data-v-b351b8b8="" className="tips_span" style={{ textAlign: 'center', position: 'inherit' }} >{err.bank}</p>
                    }
                    <div data-v-b351b8b8="" className="continue_btn">
                        <button data-v-b351b8b8="" className="ripple" onClick={() => addBank()} >Continue</button>
                    </div>
                </div>
            }

        </>
    )
}

export default Bankcard