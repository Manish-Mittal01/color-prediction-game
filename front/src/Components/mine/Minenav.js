import { Badge } from 'react-bootstrap'
// import { IoNotifications } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { blockUser } from '../../common/blockUser';
import axios from '../../axios/axios'
import { GoVerified } from 'react-icons/go';


const Minenav = ({ wallet }) => {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        user: "",
        mobile: ""
    });
    const [totalReferrals, setTotalReferrals] = useState(0);

    const navigate = useNavigate();


    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const userData = jwt(user.token);
            setUser({
                user: userData.userId,
                mobile: userData.mobile
            });

            axios.get(`user/referrals?userId=${userData.userId}`)
                .then(resp => {
                    let data = resp.data.data
                    setTotalReferrals(data.level1?.length + data?.level2.length + data?.level3.length)
                })
                .catch(err => {
                    err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate })
                })
        }
    }, []);


    return (
        <>
            <div className='mine_nav'>
                <div className='nav_1'>
                    <div className='info_left'>
                        <span className='ml-3'><Badge className='9_cus' bg="secondary">9</Badge></span>
                        <span><div className='user_info'>
                            <ul>
                                <li>User: {user.mobile}</li>
                                <li style={{ display: 'flex', alignItems: 'center' }}>ID: {user.user} {totalReferrals > 50 && <GoVerified style={{ marginLeft: 8 }} />} </li>
                            </ul>
                        </div></span>
                    </div>

                    {/* <div className="info_right">
                        <div onClick={handleShow} className="notice">
                            <IoNotifications />
                        </div>
                    </div> */}
                </div>
                <div className='nav_2'>
                    <div className="mine_top_items">
                        <div className="top_item">
                            <div>₹ {wallet.totalAmount} </div>
                            Balance
                            <button onClick={() => navigate("/recharge")} className="one_btn ripple"> Recharge </button>
                        </div>
                        <div className="top_item">
                            <div>
                                ₹ {wallet.referralAmount}
                            </div> Commission
                            <button className="one_btn ripple">See</button>
                        </div><div className="top_item"><div>₹ {wallet.bonusAmount}</div>
                            Interest
                            <button className="one_btn ripple">See</button>
                        </div>
                    </div>
                </div>

            </div>
            {/* model */}
            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notice</Modal.Title>
                </Modal.Header>
                <Modal.Body>Notice not found !</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    )
}

export default Minenav
