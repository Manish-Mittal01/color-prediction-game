// import React, { useState } from 'react'

// export default function Complaints() {
//     const [showForm, setShowForm] = useState(false);

//     return (
//         <div>
//             <div data-v-483dad1f="" className="complaints">
//                 <nav data-v-483dad1f="" className="top_nav">
//                     <div data-v-483dad1f="" className="left"><span data-v-483dad1f="">Complaints &amp; Suggestions</span></div>
//                     <div data-v-483dad1f="" className="right"><img
//                         data-v-483dad1f=""
//                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABnElEQVRoQ+2aMU4DMRBF/++4AEKiTYM4AhVHoKGCAspQcgK4AB0oZZo0VNwAKrgBHRIVEuICUA2ytEFmkzCrib0Sq7+td8Yzb75teXaJgTwcSB5QIl0qaWb7AM6ad29IPnSxi7xTrSJmNgLwBGCzCewNwIjkZyRQz6ZmItdZNeZxjElOvKAi4zUTuQeQpJU/FyQvI4F6NkrEI2RmqogHadm4pOVRk7Q8QivGJS0PnKTlEZK0goQkrSA47VoeOEnLI9R112puducAdoM+c7P2faTEVfcZwBXJl3yiX2vEzPYA3GXX0wK5VHHxAeCA5OPcezuRZXeIKpEUcDojebwqkVsAhwUm6cPFhOR4VSJJ0zMA231EssYcqSNzlLeXFs4RM9sAcAJga42JkmmCstB8WNNnMn8HMG23lXQgemR1IHqEuh6IQT8LZqpIkKQWuwdO0vIIabEHCUlaQXDatTxwkpZHSLtWkNCQpLXs8/QpyWmQzZ9mNXet9g8DrwB2SH79q0RSsE17Kf+F46d9UzqZahUpHajnT4l4hPoe/wbmcuQzOS0vzQAAAABJRU5ErkJggg=="
//                         alt="" /></div>
//                 </nav>
//                 <div data-v-483dad1f="" className="completed_box">
//                     <ul data-v-483dad1f="" className="completed_nav">
//                         <li data-v-483dad1f="">COMPLETED</li>
//                         <li data-v-483dad1f="">WAIT</li>
//                         <div data-v-483dad1f="" id="underline" className="li_line"
//                         // style="left: 20px;"
//                         ></div>
//                     </ul>
//                     <div data-v-483dad1f="" className="content_box">
//                         <div data-v-483dad1f="" className="content">
//                             <div data-v-483dad1f="" className="recharge_box">
//                                 {/* <!---->
//                         <p data-v-483dad1f="" id="norecord" className="null_data">No data available</p>
//                         <div data-v-483dad1f="" className="pagination">
//                             <ul data-v-483dad1f="" className="page_box">
//                                 <li data-v-483dad1f="" className="page"><span data-v-483dad1f="">{{(userdetails.page - 1) * 10}}-{{(userdetails.page) * 10}}</span> of{{ userdetails.total22 }}
//                                 </li>
//                                 <li data-v-483dad1f="" className="page_btn"><i data-v-483dad1f="" @click="down()"
//                                         className="van-icon van-icon-arrow-left">
//                                     <!---->
//                                 </i><i data-v-483dad1f="" @click="up()" className="van-icon van-icon-arrow">
//                                 <!----> 
//                             </i></li> 
//                     </ul>
//                 </div> */}
//                             </div>
//                         </div>
//                     </div >
//                 </div >
//                 {/* <div data-v-483dad1f="" className="agree_zz">
//                     <div data-v-483dad1f="" className="wrapper">
//                         <p data-v-483dad1f="" className="agree_title">Detail</p>
//                         <div data-v-483dad1f="" className="input_card">
//                             <div data-v-483dad1f="" className="contents">
//                                 <ul data-v-483dad1f="" className="card_ul">
//                                     <li data-v-483dad1f="">
//                                         <p data-v-483dad1f="">Type</p><input data-v-483dad1f="" type="text" disabled="false" />
//                                     </li>
//                                     <li data-v-483dad1f="">
//                                         <p data-v-483dad1f="">Out Id</p><input data-v-483dad1f="" type="text" disabled="false" />
//                                     </li>
//                                     <li data-v-483dad1f="">
//                                         <p data-v-483dad1f="">WhatsApp</p><input data-v-483dad1f="" type="text"
//                                             disabled="false" />
//                                     </li>
//                                     <li data-v-483dad1f="">
//                                         <p data-v-483dad1f="">Description</p><textarea data-v-483dad1f="" name="" id=""
//                                             disabled="false"></textarea>
//                                     </li>
//                                     <li data-v-483dad1f="">
//                                         <p data-v-483dad1f="">Reply</p><textarea data-v-483dad1f="" name="" id=""
//                                             disabled="false"></textarea>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div data-v-483dad1f="" className="close_btn"><button data-v-483dad1f="">CLOSE</button></div>
//                     </div>
//                 </div> */}
//                 {
//                     showForm &&
//                     <div data-v-483dad1f="" className="agree_zz">
//                         <div data-v-483dad1f="" className="wrapper">
//                             <p data-v-483dad1f="" className="agree_title">Detail</p>
//                             <div data-v-483dad1f="" className="input_card">
//                                 <div data-v-483dad1f="" className="contents">
//                                     <ul data-v-483dad1f="" className="card_ul">
//                                         <li data-v-483dad1f="">
//                                             <p data-v-483dad1f="">Type</p><input data-v-483dad1f="" type="text" disabled="false" />
//                                         </li>
//                                         <li data-v-483dad1f="">
//                                             <p data-v-483dad1f="">Out Id</p><input data-v-483dad1f="" type="text" disabled="false" />
//                                         </li>
//                                         <li data-v-483dad1f="">
//                                             <p data-v-483dad1f="">WhatsApp</p><input data-v-483dad1f="" type="text"
//                                                 disabled="false" />
//                                         </li>
//                                         <li data-v-483dad1f="">
//                                             <p data-v-483dad1f="">Description</p><textarea data-v-483dad1f="" name="" id=""
//                                                 disabled="false"></textarea>
//                                         </li>
//                                         <p data-v-483dad1f="" className="tips">Waiting for reply</p>
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div data-v-483dad1f="" className="close_btn"><button data-v-483dad1f="">CLOSE</button></div>
//                         </div>
//                     </div>
//                 }

//                 <div id="snackbar" className="van-toast van-toast--middle van-toast--text"
//                 //  style="z-index: 2009;display:none "
//                 >
//                     <div className="van-toast__text">success</div>
//                 </div>
//                 <div data-v-74fec56a="" data-v-483dad1f="" className="loading"
//                 // style="display: none;"
//                 >
//                     <div data-v-74fec56a="" className="v-dialog v-dialog--persistent"
//                     // style="width: 300px; display: block;"
//                     >
//                         {/* <div data-v-74fec56a="" data-v-5197ff2a="" className="v-card v-sheet theme--dark teal">
//                             <div data-v-74fec56a="" data-v-5197ff2a="" className="v-card__text"><span
//                                 data-v-74fec56a="">Loading</span>
//                                 <div data-v-74fec56a="" data-v-5197ff2a="" role="progressbar" aria-valuemin="0"
//                                     aria-valuemax="100" className="v-progress-linear mb-0"
//                                 // style="height: 7px;"
//                                 >
//                                     <div data-v-74fec56a="" className="v-progress-linear__background white"

//                                     //    style="height: 7px; opacity: 0.3; width: 100%;"
//                                     ></div>
//                                     <div data-v-74fec56a="" className="v-progress-linear__bar">
//                                         <div data-v-74fec56a=""
//                                             className="v-progress-linear__bar__indeterminate v-progress-linear__bar__indeterminate--active">
//                                             <div data-v-74fec56a="" className="v-progress-linear__bar__indeterminate long white">
//                                             </div>
//                                             <div data-v-74fec56a="" className="v-progress-linear__bar__indeterminate short white">
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div> */}
//                     </div>
//                 </div>
//             </div >


//         </div >
//     )
// }







import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { FaTelegram, FaTelegramPlane } from 'react-icons/fa'
import { GrAdd } from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'

const Complaints = () => {

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <FaTelegram style={{ color: 'blue', fontSize: "10rem" }} />
            <h3 style={{ textAlign: 'center', paddingInline: "4%", marginBlock: '5vh' }}>Join our telegram channel to get updates <br /> and to raise a complaint </h3>
            <Link to={"https://t.me/newmalls1235"} target="_blank">Join Telegram</Link>
            {/* <button onClick={() => navigate("https://t.me/newmalls1235")} >Join Telegram</button> */}
            {/* <div className='nav_login'>
                <div className='sections_order'>
                    <div>
                        <span style={{ marginLeft: 14 }} className='nav_path'>Orders</span>
                    </div>
                    <div className='d_d'>
                        <span className='c_ic_5s' ><GrAdd style={{ color: "#fff" }} /></span>
                    </div>
                </div>
            </div>
            <div>
                <Tabs
                    defaultActiveKey="profile"
                    // id="fill-tab-example"
                    className="mb-4 tab_cus_is"
                    fill
                >
                    <Tab eventKey="home" title=" COMPLETED ">
                        <p style={{ boxShadow: "1px 1px 1px 1px lightgrey", padding: 10 }} ></p>
                    </Tab>
                    <Tab eventKey="profile" title=" WAIT ">
                        <p style={{ boxShadow: "1px 1px 1px 1px lightgrey", padding: 10 }} ></p>
                    </Tab>

                </Tabs>
            </div> */}
        </div>
    )
}

export default Complaints