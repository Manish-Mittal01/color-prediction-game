import React, { useEffect } from 'react'
import { FaTelegram } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import userId from '../../../common/userId';

const Complaints = () => {
    const userData = userId();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userData) return navigate("/login");
    });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <FaTelegram style={{ color: 'blue', fontSize: "10rem" }} />
            <h3 style={{ textAlign: 'center', paddingInline: "4%", marginBlock: '5vh' }}>Join our telegram channel to get updates <br /> and to raise a complaint </h3>
            <Link to={"https://t.me/+tNhTFSyuv-BhYTc1"} target="_blank">Join Telegram</Link>
            {/* https://t.me/newmalls1235 */}
        </div>
    )
}

export default Complaints