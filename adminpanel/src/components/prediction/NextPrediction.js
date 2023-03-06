import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import './NextPrediction.css'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import axios from '../../axios/axios'
import { useNavigate } from 'react-router-dom';


export default function NextPrediction() {
    const [value, setValue] = useState('1');
    const [tab, setTab] = useState("Parity");
    const [timer, setTimer] = useState(0);
    const [updateTimer, setUpdateTimer] = useState(false);
    const [periods, setPeriods] = useState({
        Parity: "",
        Sapre: "",
        Bcone: "",
        Emred: ""
    });
    const [time, setTime] = useState({ min: "0", sec: "00" });
    const [err, setErr] = useState("")
    const [nextPrediction, setNextPrediction] = useState({});
    const [currentBets, setCurrentBets] = useState({})

    const navigate = useNavigate();
    const Ref = useRef(null);


    function currentPeriodsBets(id) {
        const period = {
            periodId: id,
        }
        axios.post("admin/currentPeriodBets", period)
            .then(resp => {
                setCurrentBets(resp.data.data)
                console.log(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        axios.get('period')
            .then(function (response) {
                let data = response.data.data;
                let Parity = data.Parity;
                let Sapre = data.Sapre;
                let Bcone = data.Bcone;
                let Emred = data.Emred;
                let periodData = {
                    Parity,
                    Sapre,
                    Bcone,
                    Emred
                }
                setPeriods(periodData);
                currentPeriodsBets(periodData["Parity"].periodId);
                let timeRemaning = data.expiredAt - Date.now();
                setTimer(timeRemaning);
                clearTimer(getDeadTime(timeRemaning));
            })
            .catch(err => {
                err.response && setErr(err.response.data.message)
            });

    }, [updateTimer]);


    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        if (!total || total <= 0) setUpdateTimer(!updateTimer)
        return {
            total, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {
            setTime({ min: (minutes > 9 ? minutes : '0' + minutes), sec: (seconds > 9 ? seconds : '0' + seconds) })
        }
    }

    const clearTimer = (e) => {
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = (timeRemaning) => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + timeRemaning / 1000);
        return deadline;
    };

    function makePrediction() {
        if (!value) return setErr({ message: "enter prediction number" })
        const period = {
            periodId: periods[tab]?.periodId,
            resultNumber: value
        }
        axios.post("admin/nextprediction", period)
            .then(resp => {
                setNextPrediction({ ...nextPrediction, [tab]: value });
                setErr("")
                setValue("")
                alert("current period prediction added successfully")
                console.log(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    // function totalAmount(filterKey) {
    //     console.log(currentBets[tab])
    //     let data = currentBets[tab].filter(item => item.prediction === filterKey);
    //     data.map(item => {
    //         let amount = 0;
    //         amount += item.betAmount;
    //     })
    // }


    return (
        <>
            <Container style={{ textAlign: 'center' }}>
                <h4 style={{ marginTop: 10 }}>New Prediction</h4>

                <Tabs
                    id="fill-tab-example"
                    className="mb-3"
                    activeKey={tab}
                    onSelect={(key) => setTab(key)}
                    fill
                >
                    <Tab eventKey="Parity" title="Parity">  </Tab>
                    <Tab eventKey="Sapre" title="Sapre">  </Tab>
                    <Tab eventKey="Bcone" title="Bcone">  </Tab>
                    <Tab eventKey="Emred" title="Emred" > </Tab>
                </Tabs>

                {/* <div className='d-flex' style={{ justifyContent: 'center' }}>
                    <h3 style={{ color: "green" }}>Total User balance :</h3><span><h3>{ } </h3></span>
                </div> */}

                <div className='d-flex' style={{ justifyContent: 'center' }}>
                    <h4>{`PERIOD:`} </h4><span> <h4> {`${periods[tab]?.periodId}`}</h4></span>
                </div>
                <div className='d-flex' style={{ justifyContent: 'center' }}>
                    <h4>Next prediction : </h4><span> <h4> {nextPrediction[tab] || "Not set"}</h4></span>
                </div>
                <div className='d-flex' style={{ justifyContent: 'center' }}>
                    <h4>Time : </h4><span> <h4>
                        <span style={{ fontSize: 20 }} >{time.min}</span>
                        <span style={{ fontSize: 20 }} className='num'>:</span>
                        <span style={{ fontSize: 20 }}>{time.sec}</span>
                    </h4></span>
                </div>

                <div className='df_5d mt-4'>
                    <div className='join_btns'>
                        <p className='join_green colors'>
                            Green
                            {/* {totalAmount("green")} */}
                        </p>
                        <p className={'Join_Violet colors'}>
                            Violet
                        </p>
                        <p className={'join_red colors'}>
                            Red
                        </p>
                    </div>

                    <div className='input_value'>
                        <div className='first_row'>
                            {
                                [0, 1, 2, 3, 4].map(item => (
                                    <p className={'enter_value'}>
                                        {item}
                                    </p>
                                ))
                            }
                        </div>
                        <div className='secound_row'>
                            {
                                [5, 6, 7, 8, 9].map(item => (
                                    <p className={'enter_value'}>
                                        {item}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div action="emredpre" id="pre" className="form-signup">
                    <h2 style={{ padding: 10 }} >Next Prediction</h2>
                    <div data-v-309ccc10="" className="input_box">
                        <input data-v-309ccc10="" type="text" name="username" id="next" placeholder="Enter a number from 0-9" onChange={(e) => {
                            let newValue = e.target.value
                            setValue(newValue);
                            (newValue && (isNaN(newValue) || newValue > 9)) && setErr({ message: "enter a number from 0-9" })
                        }} />
                    </div>
                    {
                        (err.message) &&
                        <div data-v-309ccc10="" className="tips_span" style={{ marginTop: 5, position: 'initial' }}>{err.message}</div>
                    }

                    <div data-v-309ccc10="" className="input_box_btn">
                        <button
                            onClick={() => makePrediction()}
                            data-v-309ccc10="" type="button" className="login_btn ripple">Confirm Next Prediction</button>
                    </div>
                </div>

            </Container>
        </>
    );
}

