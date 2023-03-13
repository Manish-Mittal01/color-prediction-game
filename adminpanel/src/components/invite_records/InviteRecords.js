import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import LeftSideSection from '../leftsideSection';
import SearchBox from '../search/SearchBox';

const InviteRecords = () => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        axios.post("admin/allUsers")
            .then(resp => {
                const users = resp.data.users
                setFilteredData(users)

            })
            .catch(err => {
                console.log(err)
            })
    }, []);


    return (
        <div>
            <LeftSideSection />
            <div style={{ marginInline: 20, marginTop: 80, textAlign: 'center' }}>
                <h1>Invite Records</h1>
                <Table style={{ textAlign: 'center' }} className='' responsive striped bordered >
                    <thead>
                        <tr>
                            <th>S. No.</th>
                            <th>Username</th>
                            <th>userId</th>
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
                                        <td>{item.username}</td>
                                        <td>{item.userId}</td>
                                        <td>{item.balance}</td>
                                        <td >{item.name}</td>
                                        <td >{item.accountNo}</td>
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

export default InviteRecords