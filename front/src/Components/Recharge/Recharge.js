import React, { useEffect, useState } from 'react'
import './Recharge.css'
import card from '../../images/card.png';
import { VscThreeBars } from "react-icons/vsc";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios/axios'
import small1 from '../../images/small1.png'
import small2 from '../../images/small2.png'
import small3 from '../../images/small3.png'
import small4 from '../../images/small4.png'
import small5 from '../../images/small5.png'
import jwt from 'jwt-decode';
import { blockUser } from '../../common/blockUser';



const Recharge = ({ wallet }) => {
    const [amount, setAmount] = useState();
    const [err, setErr] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (amount) setErr("")
    }, [amount])

    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div style={{ marginLeft: 14 }}><span className='nav_path'>Recharge</span></div>
                    <div className='d_d'> <span ><VscThreeBars /></span></div>
                </div>
            </div>
            <div className='balance_av_text'>
                <p>Balance:</p><span>₹ {wallet.totalAmount}</span>
            </div>
            <div className="code_input_box">
                <div className="code_input">
                    <img src={card} alt="" />
                    <input
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value)
                        }}
                        id="amount" type="number" placeholder="Enter or Select recharge amount"
                        style={{ outline: 'none' }} />
                </div>
            </div>

            <div id="paybox" className="amount_list">
                <button id="1" onClick={() => { setAmount(200) }}> ₹ <span >200</span></button>
                <button id="2" onClick={() => { setAmount(500) }}> ₹ <span >500</span></button>
                <button id="3" onClick={() => { setAmount(2000) }}> ₹ <span >2000</span></button>
                <button id="4" onClick={() => { setAmount(5000) }}> ₹ <span >5000</span></button>
                <button id="5" onClick={() => { setAmount(10000) }}> ₹ <span >10000</span></button>
                <button id="6" onClick={() => { setAmount(100000) }}> ₹ <span >100000</span></button>
            </div>
            {
                err &&
                <p style={{ color: 'red', textAlign: 'center' }} >{err}</p>
            }
            <div className='button_f'>
                <div className="recharge_btn">
                    <button
                        onClick={() => {
                            if (amount) {
                                navigate("/SubmitRechargeRequest", { state: { amount } })
                            }
                            else {
                                setErr("enter a valid amount")
                            }
                        }}
                    >
                        Recharge
                    </button>
                </div>
            </div>
        </>
    )
}

export default Recharge;

export const SubmitRechargeRequest = () => {
    const [transactionId, setTransactionId] = useState();
    const [err, setErr] = useState();
    const location = useLocation()
    console.log(location.state)
    const amount = location.state ? location.state.amount : "";
    const navigate = useNavigate();

    const upi = "mrginfotech@upi";

    const sendDepositRequest = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        const userData = jwt(user.token);

        const request = {
            userId: userData.userId,
            amount,
            transactionId
        }
        axios.post("user/deposit", request)
            .then(resp => {
                console.log(resp.data)
                alert("request submitted successfully");
                navigate("/mine");
            })
            .catch(err => {
                err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate })

                console.log(err)
            })
    }

    return (
        <>
            <div className="setp" id="setp-1"
                style={{ display: 'block' }}
            >
                <div className="navbar navbar-default"
                    style={{ marginBottom: 0, position: "relative" }}
                >
                    <h4
                        style={{ width: "100%", display: 'flex', justifyContent: 'center' }}
                        className="text-center tit">Payment Information
                        <span id="btn"
                            style={{ display: 'flex', position: 'fixed', right: 13 }}
                        >
                        </span>
                    </h4>
                </div>
                <p id="teach"
                    style={{ textAlign: 'center', fontSize: 12, color: "#333", marginBottom: -5, textDecoration: 'underline' }}
                >
                    <span
                        style={{ fontSize: 14, display: "inline-block", marginRight: 6, color: '#fff', background: '#ff0000', height: 16, width: 16, borderRadius: "50%", textAlign: 'center' }}
                    >?</span>
                    How to pay?
                </p>
                <h3 className="amount-title">
                    Payment Amount
                    <br />
                    <span>₹ {amount}</span>
                </h3>
                <div className="container-fluid highlight"
                    style={{ margin: 10 }}
                >
                    <div
                        style={{ margin: "0px auto", maxWidth: 520 }}
                    >
                        <div className="payment-model" data-model="upi">
                            <div
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <div id="qrcode"
                                    style={{ width: 100, display: "none", height: 100, marginTop: 15 }}
                                ></div>
                            </div><br />
                            <div className="upi-info"
                                style={{ display: "none", justifyContent: 'center' }}
                            >
                                <a href="upi://pay?pa=mrginfotech@upi&amp;pn=TcsClubs&amp;am=200&amp;cu=INR&amp;tn=Recharge" className="btn-copy"
                                    style={{ textAlign: 'center', fontSize: 16 }}
                                    target="_blank">
                                    Pay Now
                                </a>
                            </div>
                            <div className="upi-info">
                                <div>
                                    Pay to UPI: <br />
                                    <span id="id"
                                        style={{ color: "#ff0000" }}
                                    >{upi}</span>
                                </div>
                                <p className="btn-copy" data-clipboard-text="mrginfotech@upi"
                                    style={{ textAlign: 'center', width: 60, fontSize: 16 }}
                                    onClick={() => { navigator.clipboard.writeText(upi) }}
                                >copy</p>
                            </div>
                            <div className="upi-payment-step">
                                <span
                                    style={{ minWidth: 52, fontWeight: 800, color: '#333' }}
                                >STEP 1:</span>
                                <div id="copied">UPI ID Copied</div>
                                <div
                                    style={{ marginLeft: 10 }}
                                >
                                    click on the above button to complete payment or copy upi id
                                </div>
                            </div>
                            <div id="payment" method="post" action="">
                                <div className="upi-payment-step">
                                    <span
                                        style={{ minWidth: 52, }}
                                    >STEP 2:</span>
                                    <input type="text" id="upi-input" value={transactionId} name="utr" placeholder="ENTER REF NO.:2188xxxxxxxx" onChange={(e) => {
                                        setErr("")
                                        setTransactionId(e.target.value)
                                    }} maxLength="12" />
                                </div>
                            </div>
                            <div id="error"
                                style={{ display: "none", color: 'red', lineHeight: 26, fontSize: 16, textAlign: 'center', maxWidth: "90%", margin: "10px auto 0px" }}
                            >Invalid UTR Number!</div>
                            {
                                err &&
                                <p style={{ color: 'red', textAlign: 'center' }} >{err}</p>
                            }
                            <div className="enter-ref-warn-box">
                                <div className="enter-ref-warn">
                                    You must fill in the correct Ref No.,then click the button below to submit,and wait for it to arrive!
                                </div>
                                <div className="btns"
                                    style={{ marginTop: 0, marginBottom: 20 }}
                                >
                                    <button
                                        className="btn sub"
                                        style={{ width: 200 }}
                                        onClick={() => {
                                            if (!transactionId) return setErr("enter a valid transaction/reference id");
                                            sendDepositRequest()
                                        }}
                                    >Confirm REF NO.</button>
                                </div>
                            </div>
                        </div>

                        <div className="box">
                            <div className="text-left">
                                <p className="level-2"
                                    style={{ marginBottom: 0, color: '#333', marginBottom: 10 }}
                                >Ref No. Example</p>
                                <div className="img-row">
                                    <img src={small1} />
                                    <img src={small2} />
                                </div>
                                <div className="img-row">
                                    <img src={small3} />
                                    <img src={small4} />
                                </div>
                                <div className="img-row">
                                    <img src={small5} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}