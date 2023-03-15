import React, { useState } from 'react';
import './Promotion.css'
import Promotioncontent from './Promotioncontent';

const Promotion = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div><span style={{ marginLeft: 14 }} className='nav_path'>Promotion</span></div>
                </div>
            </div>
            <Promotioncontent />
        </>
    )
}

export default Promotion