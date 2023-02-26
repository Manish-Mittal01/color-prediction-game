import React, { useEffect, useRef, useState } from 'react'
import './Promotion.css'
import { MDBDataTable } from 'mdbreact';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Pagination from '../Win/Pagination';


const Promotion_content = () => {
    const [user, setUser] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);
    const navigate = useNavigate();
    const referalLink = `https://domain.com//#/register?r_code=${user}`

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

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    // let currentPosts = history.previousResults.slice(firstPostIndex, lastPostIndex);

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
                                <p onClick={() => navigate("/register")} className="answer" style={{ color: 'blue', cursor: 'pointer' }} id="link"> {referalLink}</p>
                            </div>
                        </div>
                        <div className="openlink">
                            <button
                                onClick={() => navigator.clipboard.writeText(referalLink)}
                                className="tag-read ripplegrey"> Copy Link </button>
                        </div>
                    </div>
                </div>
            </div>

            <Table style={{ textAlign: 'center', marginBottom: 60 }} className='' responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Phone</th>
                        <th>Water reward</th>
                        <th>First reward</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // (currentPosts && currentPosts?.length > 0) &&
                        data.rows.map((item, index) => (
                            <tr key={item.ID}>
                                <td>{item.ID}</td>
                                <td>{item.Phone}</td>
                                <td className='c_code'>{item.Water_reward}</td>
                                <td className='c_code'>{item.First_reward}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            {/* <div className='table_cus_5d'>
                <MDBDataTable
                    striped
                    bordered
                    small
                    data={data}
                />
            </div> */}

            <Pagination
                // totalPosts={records.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    )
}

export default Promotion_content