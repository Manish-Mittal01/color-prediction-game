import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap'
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import LeftSideSection from '../leftsideSection'
import './userReport.css'
import axios from '../../axios/axios'

export default function UserReport() {
    const [userRecords, setUserRecords] = useState({
        level1: [],
        level2: [],
        level3: [],
    });
    const [err, setErr] = useState("");
    const [userData, setUserData] = useState({
        mobile: "",
        userId: "",
        userBalance: 0
    })
    const [userDetails, setUserDetails] = useState({
        totalUsers: {
            title: "Total Users",
            value: 0
        },
        activeUsers: {
            title: "Active Users",
            value: 0
        },
        totalRechargeAmount: {
            title: "Team Recharge Amount",
            value: 0
        },
        userRechargeAmount: {
            title: "User Recharge Amount",
            value: 0
        },
        totalWithdrawAmount: {
            title: "Team Withdraw Amount",
            value: 0
        },
        userWithdrawAmount: {
            title: "User Withdraw Amount",
            value: 0
        },
        totalBalance: {
            title: "Team Balance",
            value: 0
        },
        userParityBetsAmount: {
            title: "Users Parity Bets",
            value: 0
        },
        userSapreBetsAmount: {
            title: "Users Sapre Bets",
            value: 0
        },
        userBconeBetsAmount: {
            title: "Users Bcone Bets",
            value: 0
        },
        userEmredBetsAmount: {
            title: "Users Emred Bets",
            value: 0
        },
    })

    const [searchParams] = useSearchParams();
    const user = searchParams.get("user")

    useEffect(() => {
        axios.get(`admin/referrals?mobile=${user}`)
            .then(resp => {
                console.log(resp.data);
                const {
                    totalActive,
                    totalBalance,
                    totalDeposit,
                    totalReferrals,
                    totalWithdrawl,
                    userData,
                    activeUsers
                } = resp.data.data;

                setUserDetails({
                    ...userDetails,
                    totalUsers: {
                        ...userDetails.totalUsers,
                        value: totalReferrals
                    },
                    activeUsers: {
                        ...userDetails.activeUsers,
                        value: totalActive
                    },
                    totalRechargeAmount: {
                        ...userDetails.totalRechargeAmount,
                        value: totalDeposit
                    },
                    userRechargeAmount: {
                        ...userDetails.userRechargeAmount,
                        value: userData.totalDeposit
                    },
                    totalWithdrawAmount: {
                        ...userDetails.totalWithdrawAmount,
                        value: totalWithdrawl
                    },
                    userWithdrawAmount: {
                        ...userDetails.userWithdrawAmount,
                        value: userData.totalWithdrawl
                    },
                    totalBalance: {
                        ...userDetails.totalBalance,
                        value: totalBalance
                    },
                    userParityBetsAmount: {
                        ...userDetails.userParityBetsAmount,
                        value: userData.betsByType.Parity
                    },
                    userSapreBetsAmount: {
                        ...userDetails.userSapreBetsAmount,
                        value: userData.betsByType.Sapre
                    },
                    userBconeBetsAmount: {
                        ...userDetails.userBconeBetsAmount,
                        value: userData.betsByType.Bcone
                    },
                    userEmredBetsAmount: {
                        ...userDetails.userEmredBetsAmount,
                        value: userData.betsByType.Emred
                    },
                });

                setUserData({
                    mobile: userData.mobile,
                    userId: userData.userId,
                    userBalance: userData.totalBalance
                });

                setUserRecords({
                    level1: activeUsers.level1,
                    level2: activeUsers.level2,
                    level3: activeUsers.level3,
                })
            })
            .catch(err => {
                console.log(err);
                setErr(err.response.data)
            })

    }, [])



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
                                <Col xs={12} sm={6} className={"cards"} >
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

            <br /><br />
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
