import React, { useEffect, useState } from 'react';
import './Promotion.css'
import Promotioncontent from './Promotioncontent';
import userId from '../../common/userId';
import { useNavigate } from 'react-router-dom';

const Promotion = () => {
    const userData = userId();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userData) return navigate("/login");
    });

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