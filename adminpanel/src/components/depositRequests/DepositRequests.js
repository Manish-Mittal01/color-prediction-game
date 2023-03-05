import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
import LeftSideSection from '../leftsideSection';
import axios from '../../axios/axios'
import './DepositRequest.css'

const WithdrwaRequests = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        axios.get("admin/deposit")
            .then(resp => {
                setRecords(resp.data.data)
                console.log(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    function finalizeRequest({ isApproved, item, index }) {
        const transactionDetail = {
            userId: item.userId,
            amount: item.amount,
            isApproved,
            transactionId: item._id
        }

        axios.post('admin/deposit', transactionDetail)
            .then(resp => {
                records.splice(index, 1);
                setRecords([...records])
                console.log(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <LeftSideSection />
            <div style={{ marginLeft: 20, marginTop: 80 }}>
                <h1>Disposit Requests</h1>
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
                                    <tr key={item.userId + index}>
                                        <td>{item.userId}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.status}</td>
                                        <td>{item.balance}</td>
                                        <td >{item.name}</td>
                                        <td >{item.AccountNumber}</td>
                                        <td >{item.requestTime}</td>
                                        <td onClick={(e) => { finalizeRequest({ isApproved: true, item, index }) }} className='yesBtn' >Yes</td>
                                        <td onClick={(e) => { finalizeRequest({ isApproved: false, item, index }) }} className='noBtn' >No</td>
                                    </tr>
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