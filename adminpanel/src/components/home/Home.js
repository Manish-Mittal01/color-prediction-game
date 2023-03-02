import React from 'react'
import LeftSideSection from '../leftsideSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faChartBar, faChartLine, faChartPie, faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';
import styles from './Home.module.css'
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()
    return (
        <>
            <LeftSideSection />
            <div style={{ marginTop: 100 }}>
                <Row style={{ marginInline: 4 }}>
                    <Col xs={6} md={3} className={styles.cards} >
                        <Card className={styles.eachCard} style={{ backgroundColor: "violet" }} >
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faChartLine} />
                                    Todays / Total Users
                                </Card.Title>
                                <Card.Text>
                                    0/10
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} className={styles.cards} >
                        <Card className={styles.eachCard} style={{ backgroundColor: '#00ff00' }}  >
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faChartBar} />
                                    Todays / Total Profit
                                </Card.Title>
                                <Card.Text>
                                    0/20
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} className={styles.cards} >
                        <Card className={styles.eachCard} style={{ backgroundColor: '#0000ff' }}  >
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faChartArea} />
                                    Todays / Total amount Withdrawn
                                </Card.Title>
                                <Card.Text>
                                    0/200
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={6} md={3} className={styles.cards} >
                        <Card className={styles.eachCard} style={{ backgroundColor: '#ff0000' }}  >
                            <Card.Body>
                                <Card.Title>
                                    <FontAwesomeIcon style={{ marginRight: 10 }} icon={faChartPie} />
                                    Todays / Total recharge
                                </Card.Title>
                                <Card.Text>
                                    0/2000
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div style={{ textAlign: 'center', width: "100%" }}>
                    <h2>Block user</h2>
                    <h2 style={{ cursor: 'pointer', width: 'fit-content', marginInline: 'auto' }} onClick={() => navigate("/setPrediction")} >Next Prediction</h2>
                </div>
            </div>
        </>
    )
}
