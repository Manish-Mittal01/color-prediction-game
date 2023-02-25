import React, { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import './Order.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const Orders = () => {
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className='nav_login'>
                <div className='sections_order'>
                    <div> <span className='nav_icon'><BsArrowLeft /></span><span className='nav_path'>Orders</span></div>

                </div>
            </div>
            <div>
                <Tabs
                    defaultActiveKey="profile"
                    // id="fill-tab-example"
                    className="mb-4 tab_cus_is"
                    fill
                >
                    <Tab eventKey="home" title=" ALL ">
                        <p>xxxxALLxxxx</p>
                    </Tab>
                    <Tab eventKey="profile" title=" UNDELIVER ">
                        <p>xxxUNDELIVERxxxxx</p>

                    </Tab>
                    <Tab eventKey="longer-tab" title=" UNRECEIVE ">
                        <p>xxxUNRECEIVExxxxx</p>

                    </Tab>
                    <Tab eventKey="contact" title=" SUCCESS " >
                        <p>xxxSUCCESSxxxxx</p>

                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default Orders