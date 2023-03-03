import React, { useState } from 'react'
import { VscThreeBars } from 'react-icons/vsc'
import withdro from '../../images/withdro.png';
import axios from '../../axios/axios';
import jwt from 'jwt-decode';
import { useSelector } from 'react-redux'
import { blockedUser } from '../../common/blockedUser';



const Withdrawal = () => {
    const [amount, setAmount] = useState(0);
    const [password, setPassword] = useState("");

    const states = useSelector((state) => state.getData)



    function makeWithdraw() {
        const user = JSON.parse(localStorage.getItem("user"));
        const userData = jwt(user.token)

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
                blockedUser();
                console.log(err)
            }
            )
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
                    <span className='balance_av_text-withrawal'> ₹{states.totalAmount}</span>
                </p>
            </div>
            <div className='balance_av_text' style={{ marginTop: -35 }}>
                <p className='balance_av_text-withrawal' style={{ fontSize: 12 }}>Withdrawable Balance:
                    <span style={{ fontSize: 10 }} className='balance_av_text-withrawal'> ₹{states.withdrawableAmount}</span>
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
            {/* add card */}
            {/* <div className="add_card">
                <div className="van-collapse van-hairline--top-bottom">
                    <div className="van-collapse-item">
                        <div role="button" tabindex="0" aria-expanded="true" className="van-cell van-cell--clickable van-collapse-item__title van-collapse-item__title--expanded">
                            <div className="van-cell__title">
                                <img src={card2} alt="" />
                                <span className='d_flex'>
                                    <Dropdown>
                                        <Dropdown.Toggle >
                                            Select Bank Card
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            <Dropdown.Item href="#/action-1" >
                                                Add Bank Card
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

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