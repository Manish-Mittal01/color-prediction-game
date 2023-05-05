import React, { useEffect, useState, useRef, memo } from 'react'
import './Win.css'
import { GiTargetPrize } from "react-icons/gi";
import axios from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import { blockUser } from '../../common/blockUser';

function Timer({ periods, setPeriods, setPeriodHistory, time, setTime, tab, getBets }) {
    const [err, setErr] = useState();
    const [updateTimer, setUpdateTimer] = useState(false);

    const navigate = useNavigate();
    const Ref = useRef(null)


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
                let timeRemaning = data.expiredAt - Date.now();
                clearTimer(getDeadTime(timeRemaning));
            })
            .catch(err => {
                err.response && setErr(err.response.data.message)
                err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate })
            });

        axios.get("period/history")
            .then(resp => {
                setPeriodHistory(resp.data.data)
            })
            .catch(err => {
                err.response && setErr(err.response.data.message)
                err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate })

            });

        getBets();
    }, [updateTimer]);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        if (!total || total <= 0) {
            setUpdateTimer(!updateTimer)
        }
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
        let deadline = new Date(Date.now() + timeRemaning);
        // deadline.setSeconds(deadline.getSeconds() + timeRemaning / 1000);
        return deadline;
    };

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

export default memo(Timer)