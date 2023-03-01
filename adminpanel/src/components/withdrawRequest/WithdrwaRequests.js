import React, { useState } from 'react';
import { Table } from 'react-bootstrap'
import LeftSideSection from '../leftsideSection';

const WithdrwaRequests = () => {
    const [records, setRecords] = useState([
        {
            userName: "9876543210",
            userId: "jqydfgeyu",
            password: "123",
            balance: 123,
            name: "Manish",
            AccountNumber: 1234,
            ifsc: "ifsc",
            upi: "upi"
        },
        {
            userName: "9876543210",
            userId: "jqyfgeyu",
            password: "123",
            balance: 123,
            name: "Manish",
            AccountNumber: 1234,
            ifsc: "ifsc",
            upi: "upi"
        }
    ]);
    const [filteredData, setFilteredData] = useState([...records]);
    const [searchValue, setSearchValue] = useState("");


    return (
        <div>
            <LeftSideSection />
            <div style={{ marginLeft: 20, marginTop: 80 }}>
                <h1>Withdraw Requests</h1>
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
                            (filteredData && filteredData.length > 0) &&
                            filteredData.map((item, index) => {
                                return (
                                    <tr key={item.userId}>
                                        <td>{item.userName}</td>
                                        <td>{item.userId}</td>
                                        <td>{item.password}</td>
                                        <td>{item.balance}</td>
                                        <td >{item.name}</td>
                                        <td >{item.AccountNumber}</td>
                                        <td >{item.ifsc}</td>
                                        <td >{item.upi}</td>
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