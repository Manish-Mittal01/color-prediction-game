import React, { useEffect, useState } from 'react'
import LeftSideSection from '../leftsideSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faChartBar, faChartLine, faChartPie, faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import styles from './Home.module.css'
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    const navigate = useNavigate();
    const [records, setRecords] = useState({
        users: { newUsers: 0, totalUsers: 0 },
        deposits: { newDeposits: 0, totalDeposits: 0 },
        withdraw: { newWithdraw: 0, totalWithrawn: 0 },
        profit: { todayProfit: 0, totalProfit: 0 },
    })

    useEffect(() => {
        axios.post("admin/home")
            .then(resp => {
                setRecords(resp.data.data)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <LeftSideSection />
            <div style={{ marginTop: 100 }}>
                <Row style={{ marginInline: 4 }}>
                    <Col xs={12} sm={6} md={3} className={styles.cards} >
                        <Card className={styles.eachCard} style={{ backgroundColor: "violet" }} >
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faChartLine} />
                                    Todays / Total Users
                                </Card.Title>
                                <Card.Text>
                                    {records.users.newUsers} / {records.users.totalUsers}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={3} className={styles.cards} >
                        <Card className={styles.eachCard} style={{ backgroundColor: '#00ff00' }}  >
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faChartBar} />
                                    Todays / Total Profit
                                </Card.Title>
                                <Card.Text>
                                    {records.profit.todayProfit} / {records.profit.totalProfit}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={3} className={styles.cards} >
                        <Card className={styles.eachCard} style={{ backgroundColor: '#0000ff' }}  >
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faChartArea} />
                                    Todays / Total amount Withdrawn
                                </Card.Title>
                                <Card.Text>
                                    {records.withdraw.newWithdraw} / {records.withdraw.totalWithrawn}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={3} className={styles.cards} >
                        <Card className={styles.eachCard} style={{ backgroundColor: '#ff0000' }}  >
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faChartPie} />
                                    Todays / Total recharge
                                </Card.Title>
                                <Card.Text>
                                    {records.deposits.newDeposits} / {records.deposits.totalDeposits}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div style={{ textAlign: 'center', width: "100%" }}>
                    <h2 onClick={() => navigate("/blockUser")} style={{ cursor: 'pointer', width: 'fit-content', marginInline: 'auto' }} >Block user</h2>
                    <h2 style={{ cursor: 'pointer', width: 'fit-content', marginInline: 'auto' }} onClick={() => navigate("/setPrediction")} >Next Prediction</h2>
                    <h2 style={{ cursor: 'pointer', width: 'fit-content', marginInline: 'auto' }} onClick={() => navigate("/userdetails")} >click here to get user details</h2>
                </div>
            </div>
        </>
    )
}
