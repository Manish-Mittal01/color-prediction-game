import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './Promotion.css'
import { GoThreeBars } from "react-icons/go";
import Promotioncontent from './Promotioncontent';
import axios from '../../axios/axios'
import jwt from 'jwt-decode';

const Promotion = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div><span style={{ marginLeft: 14 }} className='nav_path'>Promotion</span></div>
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