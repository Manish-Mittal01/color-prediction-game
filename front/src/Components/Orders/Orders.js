import React, { useEffect, useState } from 'react'
import './Order.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import userId from '../../common/userId';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const [show, setShow] = useState(false);
    const userData = userId();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userData) return navigate("/login");
    });
    return (
        <>
            <div className='nav_login'>
                <div className='sections_order'>
                    <div><span style={{ marginLeft: 14 }} className='nav_path'>Orders</span></div>

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
                        <p style={{ boxShadow: "1px 1px 1px 1px lightgrey", padding: 10 }} ></p>
                    </Tab>
                    <Tab eventKey="profile" title=" UNDELIVER ">
                        <p style={{ boxShadow: "1px 1px 1px 1px lightgrey", padding: 10 }} ></p>

                    </Tab>
                    <Tab eventKey="longer-tab" title=" UNRECEIVE ">
                        <p style={{ boxShadow: "1px 1px 1px 1px lightgrey", padding: 10 }} ></p>

                    </Tab>
                    <Tab eventKey="contact" title=" SUCCESS " >
                        <p style={{ boxShadow: "1px 1px 1px 1px lightgrey", padding: 10 }} ></p>

                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default Orders