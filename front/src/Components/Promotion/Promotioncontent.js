import React, { useEffect, useState } from 'react'
import './Promotion.css'
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Pagination from '../Win/Pagination';
import axios from '../../axios/axios'
import { blockUser } from '../../common/blockUser';
import userId from '../../common/userId';

const Promotion_content = () => {
    const [user, setUser] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [referrals, setReferrals] = useState({});
    const [referralLevel, setReferralLevel] = useState("level1");
    const [totalReferrals, setTotalReferrals] = useState(0)

    const navigate = useNavigate();
    const referalLink = `https://winmall.tech/register?r_code=${user}`

    useEffect(() => {
        let userData = userId();
        setUser(userData.userId);

        axios.get(`user/referrals?userId=${userData.userId}`)
            .then(resp => {
                let data = resp.data.data
                setReferrals(data);
                setTotalReferrals(data.level1?.length + data?.level2.length + data?.level3.length)
            })
            .catch(err => {
                err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate })
            })
    }, []);


    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    let currentPosts = referrals[referralLevel] && referrals[referralLevel].slice(firstPostIndex, lastPostIndex);


    return (
        <>
            <div className="container">
                <div className="headline"> Bonus:₹ <span >{referrals.totalReferralAmount}</span></div>
            </div>

            <div className="level_box">
                <div className="level_content">
                    <div className="level_list">
                        <ul className="layout"><li>
                            <ol> Total People </ol>
                            <ol className="two_ol">{totalReferrals}</ol>
                        </li><li><ol> Contribution </ol>
                                <ol className="two_ol"> ₹ {referrals.totalContributionAmount}</ol>
                            </li></ul><div className="layout_bot">
                            <div className="bot_list">
                                <p className="titles">My Promotion Code</p>
                                <p id="code" className="answer">{user}</p>
                            </div>
                            <div className="bot_list">
                                <p className="titles">My Promotion Link</p>
                                <p onClick={() => navigate("/register", { state: { recommendation_code: user } })} className="answer" style={{ color: 'blue', cursor: 'pointer' }} id="link"> {referalLink}</p>
                            </div>
                        </div>
                        <div className="openlink">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(referalLink)
                                    alert("link copied to clipboard")
                                }}
                                className="tag-read ripplegrey"> Copy Link </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <button className={`col-sm-4 levelTab `} onClick={() => setReferralLevel("level1")} >Level 1</button>
                <button className={`col-sm-4 levelTab `} onClick={() => setReferralLevel("level2")} >Level 2</button>
                <button className={`col-sm-4 levelTab `} onClick={() => setReferralLevel("level3")} >Level 3</button>
            </div>

            <Table style={{ textAlign: 'center' }} className='' responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Phone</th>
                        <th>Water reward</th>
                        <th>First reward</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        referrals[referralLevel] && referrals[referralLevel].length > 0 &&
                        currentPosts.map((item, index) => (
                            <tr key={index}>
                                <td>{item.referrarId}</td>
                                <td>{item.mobile}</td>
                                <td className='c_code'>0</td>
                                <td className='c_code'>{item.amount}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Pagination
                totalPosts={referrals[referralLevel] && referrals[referralLevel]?.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                currentPosts={[firstPostIndex, lastPostIndex]}
            />
        </>
    )
}

export default Promotion_content