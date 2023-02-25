import React from 'react'
import { BsArrowLeft } from "react-icons/bs";
import './Recharge.css'

const Recharge_Record = () => {
    return (
        <>
            <div className='nav_login'>
                <div className='sections_login_s'>
                    <span className='nav_icon'><BsArrowLeft /></span><span className='nav_path'>Recharge Record</span>
                </div>
            </div>
            {/*  */}
            <div class="recharge_box">
                <div class="completed_list">
                    <ul class="list_box"><li>
                        <ol><p>₹ 200</p><p style={{ color: "red" }}>Failed</p></ol
                        ><ol><p>MGEK5102402167Y57989324318</p><p class="times">EKpay</p></ol>
                        <ol><p class="oddnum">2/21/2023, 10:56:17 PM</p></ol>
                    </li></ul></div>
                {/* <div class="pagination"><ul class="page_box">
                    <li class="page"><span>0-10</span> of 2</li>
                    <li class="page_btn"><i class="van-icon van-icon-arrow-left"></i>
                        <i class="van-icon van-icon-arrow"></i></li>
                </ul></div> */}
            </div>

        </>
    )
}

export default Recharge_Record