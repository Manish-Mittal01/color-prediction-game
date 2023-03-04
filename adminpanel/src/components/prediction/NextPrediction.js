import { useState } from 'react';
import * as React from 'react';
import './NextPrediction.css'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';


export default function NextPrediction() {
    const [value, setValue] = useState('1');
    const [tab, setTab] = useState("Parity")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Container style={{ textAlign: 'center' }}>
                <h4  >
                    New Prediction
                </h4>

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


                {/*  */}

                <div className='d-flex'>
                    <h3 style={{ color: "green" }}>Total User balance :</h3><span><h3> 12172.3</h3></span>
                </div>

                <div className='d-flex'>
                    <h4>Next prediction : </h4><span> <h4> Not set</h4></span>
                </div>
                <div className='d-flex'>
                    <h4>Time : </h4><span> <h4>00:00</h4></span>
                </div>

                <div className='df_5d mt-4'>
                    <div className='join_btns'>
                        <p className='join_green colors'>
                            Green
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
                            <p className={'enter_value'}>
                                0 = 111111
                            </p>
                            <p className={'enter_value'}>
                                1
                            </p>
                            <p className={'enter_value'}>
                                2
                            </p>
                            <p className={'enter_value'}>
                                3
                            </p>
                            <p className={'enter_value'}>
                                4
                            </p>
                        </div>
                        <div className='secound_row'>
                            <p className={'enter_value'}>
                                5
                            </p>
                            <p className={'enter_value'}>
                                6
                            </p>
                            <p className={'enter_value'}>
                                7
                            </p>
                            <p className={'enter_value'}>
                                8
                            </p>
                            <p className={'enter_value'}>
                                9
                            </p>
                        </div>
                    </div>

                    {/*  */}
                    {/* <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Item> <div className='nest '>
                                <TextField id="outlined-basic" placeholder='Enter a number from 0-9' label="Next Prediction" variant="outlined" />
                                <div className='btn_submit mt-4'>
                                    <Button variant="outlined">Confirm Next Prediction</Button>
                                </div>
                            </div>

                            </Item>
                        </Grid>
                    </Grid> */}
                </div>

            </Container>
        </>
    );
}


