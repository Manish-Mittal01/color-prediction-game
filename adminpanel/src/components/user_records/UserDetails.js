import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios'

export default function UserDetails() {
    const [user, setUser] = useState("");
    const navigate = useNavigate();

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
    });
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
    });

    const getUserDetails = async () => {
        await axios.get(`admin/referrals?mobile=${user}`)
            .then(resp => {

                const {
                    totalActive,
                    totalBalance,
                    totalDeposit,
                    totalReferrals,
                    totalWithdrawl,
                    userData,
                    activeUsers
                } = resp.data.data;

                const fetchedUserDetails = {
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
                }
                setUserDetails(fetchedUserDetails);

                const fetchedUserData = {
                    mobile: userData.mobile,
                    userId: userData.userId,
                    userBalance: userData.totalBalance
                }
                setUserData(fetchedUserData);

                const fetchedUserRecord = {
                    level1: activeUsers.level1,
                    level2: activeUsers.level2,
                    level3: activeUsers.level3,
                }
                setUserRecords(fetchedUserRecord);

                setErr({});

                navigate(`/report?user=${user}`, { state: { userRecords: fetchedUserRecord, userData: fetchedUserData, userDetails: fetchedUserDetails } })
            })
            .catch(err => {
                setErr(err.response.data)
            })

    }

    return (
        <div>

            <div data-v-309ccc10="" className="recharge_box">
                <h2 style={{ padding: 10 }} >Enter the Username to get Details</h2>
                <div data-v-309ccc10="" className="input_box">
                    <input
                        onChange={(e) => setUser(e.target.value)}
                        data-v-309ccc10="" type="text" id="username" placeholder="Username or mobile" />
                </div>
                {
                    err.message &&
                    <p style={{ color: 'red', textAlign: 'center' }}>{err.message}</p>
                }
                <div data-v-309ccc10="" className="input_box_btn">
                    <button data-v-309ccc10="" onClick={getUserDetails} className="login_btn ripple">
                        Get Details
                    </button>
                </div>

                {/* <div data-v-309ccc10="" className="input_box_btn">
                    <div data-v-309ccc10="" className="two_btn"></div>
                </div> */}
            </div>
        </div>
    )
}
