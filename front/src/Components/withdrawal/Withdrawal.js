import React, { useState } from 'react'
import { VscThreeBars } from 'react-icons/vsc'
import withdro from '../../images/withdro.png';
import axios from '../../axios/axios';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { blockUser } from '../../common/blockUser';



const Withdrawal = ({ wallet }) => {
    const [amount, setAmount] = useState(0);
    const [password, setPassword] = useState("");
    const [err, setErr] = useState({})

    const navigate = useNavigate()

    function makeWithdraw() {
        const user = JSON.parse(localStorage.getItem("user"));
        const userData = jwt(user.token);
        if (wallet.withdrawableAmount < wallet.totalAmount) {
            return setErr({ message: "not enough balance" })
        }

        const withdrawRequest = {
            userId: userData.userId,
            amount,
            password
        }
        axios.post("user/withdraw", withdrawRequest)
            .then(resp => {
                alert("withdrawlrequest submited successfully")
                console.log(resp.data)
            })
            .catch(err => {
                console.log(err)
                err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate });
                setErr(err.response.data)

            })
    }

    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div><span style={{ marginLeft: 14 }} className='nav_path'>Withdrawal</span></div>
                    <div className='d_d'> <span ><VscThreeBars /></span></div>
                </div>
            </div>
            <div className='balance_av_text'>
                <p className='balance_av_text-withrawal'>Balance:
                    <span className='balance_av_text-withrawal'> ₹{wallet.totalAmount}</span>
                </p>
            </div>
            <div className='balance_av_text' style={{ marginTop: -35 }}>
                <p className='balance_av_text-withrawal' style={{ fontSize: 12 }}>Withdrawable Balance:
                    <span style={{ fontSize: 10 }} className='balance_av_text-withrawal'> ₹{wallet.withdrawableAmount}</span>
                </p>
            </div>
            <div className="code_input_box">
                <div className="code_input">
                    <img src={withdro} alt="" />
                    <input
                        value={amount || ""}
                        onChange={(e) => setAmount(e.target.value)}
                        id="amount" type="number" placeholder="Enter or Select recharge amount" style={{ outline: 'none' }}
                    />
                </div>
            </div>

            <div style={{ marginLeft: "2%", marginTop: 20 }} className="text_field"><p>Fee: <span className='nor'>{Math.floor(amount * 0.05)}</span>,to account <span className='nor'>{Math.floor(amount * 0.95)}</span></p></div>

            <div style={{ marginLeft: "2%" }} className="payment_box">
                <p className="payment_text">Payout</p>
                <div role="radiogroup" className="van-radio-group">
                    <div role="radio" tabIndex="0" aria-checked="true" className="van-radio">
                        <div className="van-radio__icon van-radio__icon--square van-radio__icon--checked">
                            <i className="van-icon van-icon-success"></i></div>
                        <span className="van-radio__label">
                            <span className="text">Bankcard</span>
                        </span></div>
                </div>
            </div>

            <div style={{ marginTop: 15 }} className="code_input_box">
                <div className="code_input">
                    <img src={withdro} alt="" />
                    <input
                        value={password || ""}
                        onChange={(e) => setPassword(e.target.value)}
                        className id="amount" placeholder="Enter login password" style={{ outline: 'none' }}
                    />
                </div>
            </div>
            {
                err.message &&
                <p style={{ color: "red", textAlign: "center" }}>{err.message}</p>
            }

            <div className='button_f'>
                <div className="recharge_btn" >
                    <button
                        className='withdrawBtn'
                        onClick={() => makeWithdraw()}
                        disabled={!amount && !password}
                    >Recharge</button></div>
            </div>
        </>
    )
}

export default Withdrawal