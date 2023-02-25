import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsArrowLeft } from 'react-icons/bs'
import './Promotion.css'
import { GoThreeBars } from "react-icons/go";
import Promotioncontent from './Promotioncontent';

const Promotion = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div> <span className='nav_icon'><BsArrowLeft /></span><span className='nav_path'>Promotion</span></div>
                    <div className='d_d'> <span onClick={handleShow} ><GoThreeBars /></span></div>
                </div>
            </div>
            <Promotioncontent />
            {/* popup buttons */}
            <Modal className='wrapper_cus_d5' show={show} onHide={handleClose}>
                <Modal.Body>
                    <div><ul className="right_nav">
                        <li>Bonus Record</li>
                        <li >Apply Record</li>
                    </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Promotion