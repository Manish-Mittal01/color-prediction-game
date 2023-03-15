import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { GiTargetPrize } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const Footer = () => {
    const navigate = useNavigate();
    const navbars = [
        {
            icon: <AiFillHome />,
            label: "Home",
            onClick: () => { navigate("/") }
        },
        {
            icon: <FaSearch />,
            label: "Search",
            onClick: () => { navigate("/search") }
        },
        {
            icon: <GiTargetPrize />,
            label: "Win",
            onClick: () => { navigate("/win") }
        },
        {
            icon: <FaUserAlt />,
            label: "My",
            onClick: () => { navigate("/mine") }
        },
    ]
    return (
        <>

            <div data-v-405e9a63="" data-v-68d7bcd4="" className="footer">
                <ul data-v-405e9a63="" className="nav_foot">
                    {
                        navbars.map((item, index) => (
                            <li onClick={item.onClick} data-v-405e9a63="" key={index} >
                                <div className='flex_cus' style={{ color: '#009688', cursor: 'pointer' }}>
                                    <p style={{ marginBottom: 0, marginTop: 12, textAlign: 'center' }}>{item.icon}</p>
                                    <p style={{ margin: 0 }}>{item.label}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Footer