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
            <div className="recharge_box">
                <div className="completed_list">
                    <ul className="list_box"><li>
                        <ol><p>₹ 200</p><p style={{ color: "red" }}>Failed</p></ol
                        ><ol><p>MGEK5102402167Y57989324318</p><p className="times">EKpay</p></ol>
                        <ol><p className="oddnum">2/21/2023, 10:56:17 PM</p></ol>
                    </li></ul></div>
                {/* <div className="pagination"><ul className="page_box">
                    <li className="page"><span>0-10</span> of 2</li>
                    <li className="page_btn"><i className="van-icon van-icon-arrow-left"></i>
                        <i className="van-icon van-icon-arrow"></i></li>
                </ul></div> */}
            </div>

        </>
    )
}

export default Recharge_Record