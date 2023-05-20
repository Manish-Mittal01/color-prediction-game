import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import LeftSideSection from '../leftsideSection';
import SearchBox from '../search/SearchBox';

const RechargeRecord = () => {
    const [records, setRecords] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        axios.get("admin/deposit/history")
            .then(resp => {
                let { data } = resp.data
                data = [...data.approved, ...data.rejected]
                setRecords(data)
                setFilteredData(data)

            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    function filterResults(value) {
        setSearchValue(value)
        let data = records.filter(item => {
            return item.username.includes(value) || item.userId.includes(value)
        });
        setFilteredData(data);
    }

    return (
        <div>
            <LeftSideSection />
            <div style={{ marginInline: 20, marginTop: 80, textAlign: 'center' }}>
                <SearchBox searchValue={searchValue} filterResults={filterResults} />
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
                            <th>Amount</th>
                            <th>Request Time</th>
                            <th>Status</th>
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
                                        <td>{item.wallet + item.amount}</td>
                                        <td >{item.name}</td>
                                        <td >{item.accountNo}</td>
                                        <td >{item.ifsc}</td>
                                        <td >{item.upi}</td>
                                        <td >{item.amount}</td>
                                        <td >{item.requestTime}</td>
                                        <td style={{ backgroundColor: item.status === "approved" ? "green" : "red" }} >{item.status}</td>
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

export default RechargeRecord