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
                    <div> <span className='nav_icon'><BsArrowLeft /></span><span className='nav_path'>Withdrawal</span></div>
                    <div className='d_d'> <span ><VscThreeBars /></span></div>
                </div>
            </div>
            <div className='balance_av_text'>
                <p className='balance_av_text-withrawal'>Balance:</p><span className='balance_av_text-withrawal'>₹ 200</span>
            </div>
            <div className class="code_input_box">
                <div className class="code_input">
                    <img className src={withdro} alt="" />
                    <input className id="amount" type="number" placeholder="Enter or Select recharge amount" style={{ outline: 'none' }} />
                </div>
            </div>

            <div class="text_field"><p>Fee: <span className='nor'>0</span>,to account <span className='nor'>0</span></p></div>

            <div class="payment_box">
                <p class="payment_text">Payout</p>
                <div role="radiogroup" class="van-radio-group">
                    <div role="radio" tabindex="0" aria-checked="true" class="van-radio">
                        <div class="van-radio__icon van-radio__icon--square van-radio__icon--checked">
                            <i class="van-icon van-icon-success"></i></div>
                        <span class="van-radio__label">
                            <span class="text">Bankcard</span>
                        </span></div>
                </div>
            </div>
            {/* add card */}
            <div class="add_card">
                <div class="van-collapse van-hairline--top-bottom">
                    <div class="van-collapse-item">
                        <div role="button" tabindex="0" aria-expanded="true" class="van-cell van-cell--clickable van-collapse-item__title van-collapse-item__title--expanded">
                            <div class="van-cell__title">
                                <img src={card2} alt="" />
                                {/* <div class="nav_name">Select Bank Card</div> */}
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