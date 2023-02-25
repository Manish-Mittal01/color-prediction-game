import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { VscThreeBars } from 'react-icons/vsc'
import withdro from '../../images/withdro.png';
import card2 from '../../images/card2.png';
import { Dropdown } from 'react-bootstrap';
const Withdrawal = () => {
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
                    <span className='balance_av_text-withrawal'> ₹200</span>
                </p>
            </div>
            <div className='balance_av_text' style={{ marginTop: -35 }}>
                <p className='balance_av_text-withrawal' style={{ fontSize: 10 }}>Withdrawable Balance:
                    <span style={{ fontSize: 10 }} className='balance_av_text-withrawal'> ₹200</span>
                </p>
            </div>
            <div  className="code_input_box">
                <div  className="code_input">
                    <img className src={withdro} alt="" />
                    <input className id="amount" type="number" placeholder="Enter or Select recharge amount" style={{ outline: 'none' }} />
                </div>
            </div>

            <div className="text_field"><p>Fee: <span className='nor'>0</span>,to account <span className='nor'>0</span></p></div>

            <div className="payment_box">
                <p className="payment_text">Payout</p>
                <div role="radiogroup" className="van-radio-group">
                    <div role="radio" tabindex="0" aria-checked="true" className="van-radio">
                        <div className="van-radio__icon van-radio__icon--square van-radio__icon--checked">
                            <i className="van-icon van-icon-success"></i></div>
                        <span className="van-radio__label">
                            <span className="text">Bankcard</span>
                        </span></div>
                </div>
            </div>
            {/* add card */}
            <div className="add_card">
                <div className="van-collapse van-hairline--top-bottom">
                    <div className="van-collapse-item">
                        <div role="button" tabindex="0" aria-expanded="true" className="van-cell van-cell--clickable van-collapse-item__title van-collapse-item__title--expanded">
                            <div className="van-cell__title">
                                <img src={card2} alt="" />
                                {/* <div className="nav_name">Select Bank Card</div> */}
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
            </div>

            <div className='button_f'>
                <div className="recharge_btn"><button >Recharge</button></div>
            </div>
        </>
    )
}

export default Withdrawal