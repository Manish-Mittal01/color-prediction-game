import React from 'react'
import { BsArrowLeft } from "react-icons/bs";
import './Recharge.css'
import card from '../../images/card.png';
import { VscThreeBars } from "react-icons/vsc";
const Recharge = () => {
    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div> <span className='nav_icon'><BsArrowLeft /></span><span className='nav_path'>Recharge</span></div>
                    <div className='d_d'> <span ><VscThreeBars /></span></div>
                </div>
            </div>
            <div className='balance_av_text'>
                <p>Balance:</p><span>₹ 200</span>
            </div>
            <div className class="code_input_box">
                <div className class="code_input">
                    <img className src={card} alt="" />
                    <input className id="amount" type="number" placeholder="Enter or Select recharge amount" style={{ outline: 'none' }} />
                </div>
            </div>

            <div id="paybox" className="amount_list">
                <button id="1" className="choose_active">
                    ₹ <span >200</span>
                </button>
                <button id="2"> ₹ <span >500</span></button>
                <button id="3"> ₹ <span >2000</span></button
                ><button id="4"> ₹ <span >5000</span></button>
                <button id="5"> ₹ <span >10000</span></button>
                <button id="6"> ₹ <span >100000</span></button>
            </div>

            <div className='button_f'>
                <div className="recharge_btn"><button >Recharge</button></div>
            </div>
        </>
    )
}

export default Recharge