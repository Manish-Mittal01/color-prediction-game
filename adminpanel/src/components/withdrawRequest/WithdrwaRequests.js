import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
import LeftSideSection from '../leftsideSection';
import axios from '../../axios/axios'
import './WithdrawRequests.css'

const WithdrwaRequests = () => {
    const [records, setRecords] = useState([]);
    const [err, setErr] = useState({})

    useEffect(() => {
        axios.get("admin/withdraw")
            .then(resp => {
                setRecords(resp.data.data)
                console.log(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    function finalizeRequest({ isApproved, item, index, transactionId }) {
        const transactionDetail = {
            userId: item.userId,
            amount: item.amount,
            isApproved,
            transactionId
        }
        console.log(transactionId)

        axios.post('admin/withdraw', transactionDetail)
            .then(resp => {
                records.splice(index, 1);
                setRecords([...records]);
                setErr({})
                console.log(resp.data)
            })
            .catch(err => {
                err.response && setErr(err.response.data)
                console.log(err)
            })
    }


    return (
        <div>
            <LeftSideSection />
            <div style={{ marginLeft: 20, marginTop: 80 }}>
                <h1>Withdrawl Requests</h1>
                <Table style={{ textAlign: 'center' }} className='' responsive striped bordered >
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>amount</th>
                            <th>Status</th>
                            <th>Account No.</th>
                            <th>IFSC</th>
                            <th>UPI</th>
                            <th>Request Time</th>
                            <th>Approve</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (records && records.length > 0) &&
                            records.map((item, index) => {
                                return (
                                    <>
                                        <tr key={item.userId + index}>
                                            <td>{item.userId}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.status}</td>
                                            <td>{item.balance}</td>
                                            <td >{item.name}</td>
                                            <td >{item.AccountNumber}</td>
                                            <td >{item.requestTime}</td>
                                            <td onClick={(e) => { finalizeRequest({ isApproved: true, item, index, transactionId: item._id }) }} className='yesBtn' >Yes</td>
                                            <td onClick={(e) => { finalizeRequest({ isApproved: false, item, index, transactionId: item._id }) }} className='noBtn' >No</td>
                                        </tr>
                                        {
                                            err.message &&
                                            <tr>
                                                <td style={{ color: 'red' }} colSpan={10}>{err.message}</td>
                                            </tr>
                                        }
                                    </>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default WithdrwaRequests