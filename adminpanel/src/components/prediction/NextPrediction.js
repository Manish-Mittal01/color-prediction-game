import { useState } from 'react';
import * as React from 'react';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function NextPrediction() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    New Prediction
                </Typography>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Parity" value="1" />
                                <Tab label="sapre" value="2" />
                                <Tab label="Emred" value="3" />
                                <Tab label="Becone" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">Parity</TabPanel>
                        <TabPanel value="2">sapre</TabPanel>
                        <TabPanel value="3">Emred</TabPanel>
                        <TabPanel value="4">Becone</TabPanel>
                    </TabContext>
                </Box>
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

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Item><span>Red:₹ <b>0</b></span></Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item><span>Green:₹<b>0</b></span></Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item><span>Violet:₹ <b>0</b></span></Item>
                        </Grid>
                    </Grid>



                    {/*  */}

                    <Grid container spacing={2}>
                        {/* f1 */}
                        <Grid item xs={3}>
                            <Item><span>zero:₹  <b>0</b></span></Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item><span>one:₹<b>0</b></span></Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item><span>two:₹ <b>0</b></span></Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item><span> three:₹ <b>0</b></span></Item>
                        </Grid>
                        {/* f2 */}
                        <Grid item xs={3}>
                            <Item><span>four:₹ <b>0</b></span></Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item><span>five:₹<b>0</b></span></Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item><span>six:₹ <b>0</b></span></Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item><span>seven:₹ <b>0</b></span></Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item><span>eight:₹ <b>0</b></span></Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item><span>nine:₹ <b>0</b></span></Item>
                        </Grid>

                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Item> <div className='nest '>
                                <TextField id="outlined-basic" placeholder='Enter a number from 0-9' label="Next Prediction" variant="outlined" />
                                <div className='btn_submit mt-4'>
                                    <Button variant="outlined">Confirm Next Prediction</Button>
                                </div>
                            </div>

                            </Item>
                        </Grid>

                    </Grid>
                </div>

            </Container>
        </>
    );
}


