import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import LeftSideSection from '../leftsideSection'
import './userReport.css'

export default function UserReport() {
    const data = useLocation().state
    const [userData, setUserData] = useState(data.userData)
    const [userDetails, setUserDetails] = useState(data.userDetails)
    const [userRecords, setUserRecords] = useState(data.userRecords)


    return (
        <div>
            <LeftSideSection />
            <div className="header" style={{ marginInline: 20, marginTop: 80, textAlign: 'center' }}>
                <h1 style={{ fontWeight: "bold" }}>User Total Report</h1>
            </div>
            <h3 style={{ textAlign: 'center' }}>
                Report for User:<span style={{ color: 'red' }}>{userData.mobile}</span></h3>
            <h3 style={{ textAlign: 'center' }}>
                usercode:<span style={{ color: 'red' }}>{userData.userId}</span></h3>
            <h3 style={{ textAlign: 'center' }}>
                User Balance:<span style={{ color: "green" }}>{userData.userBalance}</span></h3>

            <div className="container">
                <Row style={{ marginInline: 4 }}>
                    {
                        Object.values(userDetails).map(item => {
                            return (
                                <Col key={item.title} xs={12} sm={6} className={"cards"} >
                                    <Card className={"eachCard"} >
                                        <Card.Body>
                                            <Card.Title>
                                                {item.title}
                                            </Card.Title>
                                            <Card.Text>
                                                {item.value}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }

                </Row>
            </div>

            <h2>LEVEL 1 Users</h2>
            <Table style={{ textAlign: 'center' }} className='' responsive striped bordered variant='dark' >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Phone</th>
                        <th>Recharge</th>
                        <th>Join Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userRecords.level1.map(item => (
                            <tr key={item.userId}>
                                <td>{item.userId}</td>
                                <td>{item.mobile}</td>
                                <td>{item.totalDeposit}</td>
                                <td>{new Date(item.joiningDate).toLocaleString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <h2>LEVEL 2 Users</h2>
            <Table style={{ textAlign: 'center' }} className='' responsive striped bordered >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Phone</th>
                        <th>Recharge</th>
                        <th>Join Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userRecords.level2.map(item => (
                            <tr key={item.userId}>
                                <td>{item.userId}</td>
                                <td>{item.mobile}</td>
                                <td>{item.totalDeposit}</td>
                                <td>{new Date(item.joiningDate).toLocaleString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

        </div>
    )
}
