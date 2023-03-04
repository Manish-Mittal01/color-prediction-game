import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
import axios from '../../axios/axios';
import LeftSideSection from '../leftsideSection';
import jwt from 'jwt-decode'

const User = () => {
    const [records, setRecords] = useState([]);
    const [filteredData, setFilteredData] = useState([...records]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        axios.post("admin/allUsers")
            .then(resp => {
                const users = resp.data.users
                setRecords(users)
                setFilteredData(users)
                console.log(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);


    function filterResults(value) {
        setSearchValue(value)
        let data = records.filter(item => {
            return item.mobile.includes(value) || item.userId.includes(value)
        });
        setFilteredData(data);
    }

    return (
        <div>
            <LeftSideSection />
            <div style={{ marginLeft: 20, marginTop: 80, textAlign: 'center' }}>
                <input
                    value={searchValue}
                    style={{ margin: 10, minWidth: 250, height: 30 }}
                    onChange={(e) => filterResults(e.target.value)}
                    placeholder="Search by username or user code"
                    className='searchBox'
                />
                <h2 style={{ textAlign: 'center' }}>Withdraw Requests</h2>
                <h2 style={{ textAlign: 'center' }}>Recharge Requests</h2>
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
                                        <td>{item.mobile}</td>
                                        <td>{item.userId}</td>
                                        <td>{jwt(item.password)}</td>
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