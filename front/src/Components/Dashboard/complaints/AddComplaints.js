import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'

const AddComplaints = () => {
    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div> <span className='nav_icon'><BsArrowLeft /></span><span className='nav_path'>Add Address</span></div>
                    {/* <div className='d_d'> <span ><GrAdd /></span></div> */}
                </div>
            </div>

            {/* address  form */}
            <div className="input_card">
                <ul className="card_ul">
                    <li><p>Type
                    </p>
                        <input type="text" />
                    </li><li>
                        <p>Out Id</p>
                        <input type="text" />
                    </li><li><p>WhatsApp</p>
                        <input type="text" /></li><li>
                        <p>Description</p><input type="text" />
                    </li>
                </ul>
                <p className="tips">Service: 10:00~17:00, Mon~Fri about 1~5 business days</p>
                <div className="continue_btn">
                    <button className="ripple">Continue</button>
                </div>
            </div>
        </>
    )
}

export default AddComplaints