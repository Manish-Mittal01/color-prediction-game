import React, { useEffect, useState } from 'react'
import './Win.css'
import { GiTargetPrize } from "react-icons/gi";
import axios from '../../axios/axios';
import { blockedUser } from '../../common/blockedUser';

export default function Timer({ periods, setPeriods, setPeriodHistory, time, setTime }) {
    // const [periods, setPeriods] = useState({
    //     Parity: "",
    //     Sapre: "",
    //     Bcone: "",
    //     Emred: ""
    // });
    const [err, setErr] = useState();
    const [tab, setTab] = useState("Parity");
    const [timer, setTimer] = useState(0);
    // const [time, setTime] = useState({ min: "0", sec: "00" });
    const [updateTimer, setUpdateTimer] = useState(false);
    // const [periodHistory, setPeriodHistory] = useState({})


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
                setTimer(data.expiredAt - Date.now());

            })
            .catch(err => {
                blockedUser();
                setErr(err)
            }
            );

        axios.get("period/history")
            .then(resp => {
                setPeriodHistory(resp.data.data)
            })
            .catch(err => {
                blockedUser();
                setErr(err.response.data.message)
            }
            );


    }, [updateTimer]);

    useEffect(() => {
        if (timer < 0) return setUpdateTimer(!updateTimer);
        const interval = setInterval(() => {
            let newTimer = Math.floor(timer / 1000)
            let sec = newTimer % 60
            let min = (newTimer - sec) / 60;
            setTime({ min: min, sec: sec });
            setTimer(prev => prev - 1000)
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <>
            {
                periods[tab] &&
                <div className='main_buy_sell'>
                    <div className='main_left_Period'>
                        <p className='Period'><span className='Period_icon'><GiTargetPrize /></span><span className='Period_content'>Period</span></p>
                        <p className='id_value'>{periods[tab]?.periodId}</p>
                    </div>
                    <div className='main_right_count_down'>
                        <p className='Count_Down_content'>Count Down</p>
                        <p className='Count_Down'>
                            <span >{time.min}</span>
                            <span className='num'>:</span>
                            <span>{time.sec}</span>
                        </p>
                    </div>
                </div>
            }
        </>
    )
}
