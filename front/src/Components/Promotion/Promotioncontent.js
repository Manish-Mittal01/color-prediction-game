import React, { useEffect, useState } from 'react'
import './Promotion.css'
import { MDBDataTable } from 'mdbreact';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const Promotion_content = () => {
    const [user, setUser] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        let userData = jwt(user.token);
        setUser(userData.user_code)
    }, [])
    const data = {
        columns: [
            {
                label: 'ID',
                field: 'ID',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Phone',
                field: 'Phone',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Water_reward',
                field: 'Water_reward',
                sort: 'asc',
                width: 200
            },
            {
                label: 'First_reward',
                field: 'First_reward',
                sort: 'asc',
                width: 100
            }

        ],
        rows: [
            {
                ID: '705',
                Phone: '7087376726',
                Water_reward: 'Edinburgh',
                First_reward: '61',
            },
            {
                ID: '705',
                Phone: '7087376726',
                Water_reward: 'Edinburgh',
                First_reward: '61',
            }
            ,
            {
                ID: '705',
                Phone: '7087376726',
                Water_reward: 'Edinburgh',
                First_reward: '61',
            },
            {
                ID: '705',
                Phone: '7087376726',
                Water_reward: 'Edinburgh',
                First_reward: '61',
            }
        ]
    };

    return (
        <>
            <div className="container">
                <div className="headline"> Bonus:₹ <span >9253.71</span></div>
            </div>

            <div className="level_box">
                <div className="level_content">
                    <div className="level_list">
                        <ul className="layout"><li>
                            <ol> Total People </ol>
                            <ol className="two_ol">456</ol>
                        </li><li><ol> Contribution </ol>
                                <ol className="two_ol"> ₹ 236584.2</ol>
                            </li></ul><div className="layout_bot">
                            <div className="bot_list">
                                <p className="titles">My Promotion Code</p>
                                <p id="code" className="answer">{user}</p>
                            </div>
                            <div className="bot_list">
                                <p className="titles">My Promotion Link</p>
                                <p onClick={() => navigate("/register")} className="answer heights" id="link"> https://domain.com//#/register?r_code={user}</p>
                            </div>
                        </div>
                        <div className="openlink">
                            <button className="tag-read ripplegrey"> Copy Link </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='table_cus_5d'>
                <MDBDataTable
                    striped
                    bordered
                    small
                    data={data}
                />
            </div>
        </>
    )
}

export default Promotion_content