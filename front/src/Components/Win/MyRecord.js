import React, { useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { BsFillFileTextFill } from "react-icons/bs";
import axios from "../../axios/axios";
import Pagination from "./Pagination";

const MyRecord = ({ tab }) => {
    const [records, setRecords] = useState({
        parityRecords: [],
        sapreRecords: [],
        bconRecords: [],
        emredRecords: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    // let currentPosts = history.previousResults.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        axios.post("user/getBets")
            .then(resp => {
                let parityRecords = resp.data.records.filter(item => item.periodName === "Parity")
                let sapreRecords = resp.data.records.filter(item => item.periodName === "Sapre")
                let bconRecords = resp.data.records.filter(item => item.periodName === "Bcone")
                let emredRecords = resp.data.records.filter(item => item.periodName === "Emred")
                setRecords({
                    parityRecords,
                    sapreRecords,
                    bconRecords,
                    emredRecords
                })
            })
            .catch(err => console.log(err.response.data));
    }, [])

    return (
        <>
            <div className="p_records">
                <BsFillFileTextFill style={{ height: 40, width: 30, marginBlock: "16px 8px" }} />
                <p>My Record</p>
            </div>
            {/* <div className="main_wrap_f" style={{ marginBottom: 70 }}>

                <Accordion>
                    <Accordion.Item eventKey={"0"} className="accordionItem">
                        <Accordion.Header>
                            <span className="kd_t5">
                                <span className="res_text">fall</span>
                                <span className="res_text">-91</span>
                            </span>
                        </Accordion.Header>
                        <Accordion.Body style={{ padding: "10px 16px" }}>
                            <div className="myParity">
                                <p className="myParity_title">Period Detail</p>
                                <ul>
                                    <li>
                                        <ol> Period </ol>
                                        <ol>20230135105</ol>
                                    </li>
                                    <li>
                                        <ol> Contract Money </ol>
                                        <ol>10</ol>
                                    </li>
                                    <li>
                                        <ol> Delivery </ol>
                                        <ol>
                                            <span className="orange">9.5</span>
                                        </ol>
                                    </li>
                                    <li>
                                        <ol> Fee </ol>
                                        <ol>0.5</ol>
                                    </li>
                                    <li>
                                        <ol> Open Price </ol>
                                        <ol>46232</ol>
                                    </li>
                                    <li>
                                        <ol> Result </ol>
                                        <ol>
                                            <span className="bluecolor">2&nbsp;</span>
                                            <span style={{ color: "red" }}></span>
                                        </ol>
                                    </li>
                                    <li>
                                        <ol> Select </ol>
                                        <ol>
                                            <span style={{ color: "voilet" }}>violet</span>
                                        </ol>
                                    </li>
                                    <li>
                                        <ol> Status </ol>
                                        <ol>
                                            <span className="fail">fail</span>
                                        </ol>
                                    </li>
                                    <li>
                                        <ol> Amount </ol>
                                        <ol>
                                            <span className="fail">-9.50</span>
                                        </ol>
                                    </li>
                                    <li>
                                        <ol> Create Time </ol>
                                        <ol>2/21/2023, 7:39:33 AM</ol>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div> */}

            <Table style={{ textAlign: 'center', marginBottom: 70 }} className='' responsive>
                <tbody>
                    {
                        (records && records?.length > 0) &&
                        records.map((item, index) => (
                            <tr key={item.period}>
                                <Accordion>
                                    <Accordion.Item eventKey={"0"} className="accordionItem">
                                        <Accordion.Header>
                                            <span className="kd_t5">
                                                <span className="res_text">fall</span>
                                                <span className="res_text">-91</span>
                                            </span>
                                        </Accordion.Header>
                                        <Accordion.Body style={{ padding: "10px 16px" }}>
                                            <div className="myParity">
                                                <p className="myParity_title">Period Detail</p>
                                                <ul>
                                                    <li>
                                                        <ol> Period </ol>
                                                        <ol>20230135105</ol>
                                                    </li>
                                                    <li>
                                                        <ol> Contract Money </ol>
                                                        <ol>10</ol>
                                                    </li>
                                                    <li>
                                                        <ol> Delivery </ol>
                                                        <ol>
                                                            <span className="orange">9.5</span>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        <ol> Fee </ol>
                                                        <ol>0.5</ol>
                                                    </li>
                                                    <li>
                                                        <ol> Open Price </ol>
                                                        <ol>46232</ol>
                                                    </li>
                                                    <li>
                                                        <ol> Result </ol>
                                                        <ol>
                                                            <span className="bluecolor">2&nbsp;</span>
                                                            <span style={{ color: "red" }}></span>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        <ol> Select </ol>
                                                        <ol>
                                                            <span style={{ color: "voilet" }}>violet</span>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        <ol> Status </ol>
                                                        <ol>
                                                            <span className="fail">fail</span>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        <ol> Amount </ol>
                                                        <ol>
                                                            <span className="fail">-9.50</span>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        <ol> Create Time </ol>
                                                        <ol>2/21/2023, 7:39:33 AM</ol>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                {/* <td>{item.period}</td>
                                <td>{item.price}</td>
                                <td className='c_code'>{item.number}</td>
                                <td>
                                    <span className='c_red' style={{ color: item.result }}>
                                        <GoPrimitiveDot style={{ width: 20, height: 20 }} />
                                    </span>
                                </td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Pagination
                totalPosts={records.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    );
};

export default MyRecord;
