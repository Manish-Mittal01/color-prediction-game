import React, { useState } from 'react';
import { Table } from 'react-bootstrap'
import LeftSideSection from '../leftsideSection';

const User = () => {
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


    function filterResults(value) {
        setSearchValue(value)
        let data = records.filter(item => {
            return item.userName.includes(value) || item.userId.includes(value)
        });
        setFilteredData(data);
    }

    return (
        <div>
            <LeftSideSection />
            <div style={{ marginLeft: 20, marginTop: 80 }}>
                <h2 style={{ textAlign: 'center' }}>Withdraw Requests</h2>
                <h2 style={{ textAlign: 'center' }}>Recharge Requests</h2>
                <input
                    value={searchValue}
                    style={{ margin: 10, minWidth: 250 }}
                    onChange={(e) => filterResults(e.target.value)}
                    placeholder="Search by username or user code"
                />
                <Table style={{ textAlign: 'center' }} className='' responsive striped bordered >
                    <thead>
                        <tr>
                            <th>S. No.</th>
                            <th>Username</th>
                            <th>userId</th>
                            <th>Password</th>
                            <th>Balance</th>
                            <th>Name</th>
                            <th>Account No.</th>
                            <th>IFSC</th>
                            <th>UPI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (filteredData && filteredData.length > 0) &&
                            filteredData.map((item, index) => {
                                return (
                                    <tr key={item.userId}>
                                        <td>{index + 1}</td>
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

export default User