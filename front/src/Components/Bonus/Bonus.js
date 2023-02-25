
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsArrowLeft } from 'react-icons/bs'
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Money from '../../images/money.png';

function Bonus() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div> <span className='nav_icon'><BsArrowLeft /></span><span className='nav_path'>Bonus Record</span></div>
                    <div className='d_d'> <span onClick={handleShow} ><AiOutlineQuestionCircle /></span></div>
                </div>
            </div>

            {/* r_box */}

            <div className='recharge_box_02'>
                <div className='completed_list'>
                    <ul className='list_box'>
                        <li className='kg_u5'>
                            <ol className='bold_cus'>
                                <p>8057467541</p>
                                <p className='oddnum'>₹ 200 </p>
                            </ol>
                            <ol className='bold_cus'>
                                <p className='times'>2023-02-22 05:04:41</p>
                                <div className='icon'>
                                    <img src={Money} alt="Money icon" />
                                </div>
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>



            {/*  */}
            {/* popup */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size="lg"
                centered
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Explain</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal_content'>
                        <p>When your friends trade, you will also receive a 30% commission. Therefore, the more friends you invite, the higher your commission. There is a fixed income every day, the commission is permanent, but the reward is only onceWhen they make money, they will invite their friends to join them, and then you can get a 20% commission. In this way, your team can spread quickly. Therefore, I hope everyone can use our platform to make money, make money, and make money!When they make money, they will invite their friends to join them, and then you can get a 20% commission. In this way, your team can spread quickly. Therefore, I hope everyone can use our platform to make money, make money, and make money!Level 1 commission: Friends who join through your own link belong to your level, when they trade, you will get 30% commission.Tier 2 commission: Friends who join through your friend link belong to your secondary commission. When they trade, you can get 20% commission.Level 3 commission: Friends who join through friends of friends belong to your level 3. When they trade, you get 10% commission.Promotional rewards: 10% bonus amount for the first recharge after the first-level lower level joins. If your friend joins through your invitation and recharges 1000 for the first time, you will get 200</p>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Bonus