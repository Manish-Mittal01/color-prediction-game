import jwt from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios/axios'
import { blockUser } from '../../common/blockUser'

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate()

    const userId = localStorage.getItem("user") && jwt(JSON.parse(localStorage.getItem("user")).token).userId
    useEffect(() => {
        axios.get(`user/transactions?userId=${userId}`)
            .then(resp => {
                console.log(resp.data)
            })
            .catch(err => {
                console.log(err)
                err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate })
            })
    }, [])

    return (
        <>
            <div className='nav_login'>
                <div className='sections_login'>
                    <div><span style={{ marginLeft: 14 }} className='nav_path'>Transactions</span></div>
                    {/* <div className='d_d'> <span onClick={handleShow} ><AiOutlineQuestionCircle /></span></div> */}
                </div>
            </div>

            {/* r_box */}

            <div className='recharge_box_02'>
                <div className='completed_list'>
                    <ul className='list_box'>
                        <li className='kg_u5'>
                            <ol className='bold_cus'>
                                <p>8057467541</p>
                                <p style={{ marginRight: 14 }} className='oddnum'>₹ 200 </p>
                            </ol>
                            <ol className='bold_cus'>
                                <p className='times'>2023-02-22 05:04:41</p>
                                {/* <div className='icon'>
                                    <img src={Money} alt="Money icon" />
                                </div> */}
                            </ol>
                        </li>
                    </ul>
                </div>
            </div>

            {/* <Table style={{ textAlign: 'center' }} className='' responsive>
                <thead>
                    <tr>
                        <th>Period</th>
                        <th>Price</th>
                        <th>Number</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (currentPosts && currentPosts?.length > 0) &&
                        currentPosts.map((item, index) => (
                            <tr key={item.periodId}>
                                <td>{item.periodId}</td>
                                <td>{item.price}</td>
                                <td>{item.resultNumber}</td>
                                <td>
                                    <span className='c_red' style={{ color: item.resultColor }}>
                                        <GoPrimitiveDot style={{ width: 20, height: 20 }} />
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table> */}

        </>
    )
}

export default Transactions