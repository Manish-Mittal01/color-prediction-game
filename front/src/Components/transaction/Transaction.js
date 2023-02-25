import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'

const Transactions = () => {
    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div><span style={{ marginLeft: 14 }} className='nav_path'>Transactions</span></div>
                    {/* <div className='d_d'> <span onClick={handleShow} ><AiOutlineQuestionCircle /></span></div> */}
                </div>
            </div>

            {/* r_box */}

            <div className='recharge_box_02'>
                <div className='completed_list'>
                    <ul className='list_box'>
                        <li className='kg_u5'>
                            <ol className='bold_cus'>
                                <p>8057467541</p>
                                <p style={{ marginRight: 14 }} className='oddnum'>₹ 200 </p>
                            </ol>
                            <ol className='bold_cus'>
                                <p className='times'>2023-02-22 05:04:41</p>
                                {/* <div className='icon'>
                                    <img src={Money} alt="Money icon" />
                                </div> */}
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Transactions