import React, { memo, useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import axios from "../../axios/axios";
import LeftSideSection from "../leftsideSection";
import Pagination from "../pagination/Pagination";

const MyRecord = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);
    const [allBets, setAllBets] = useState([]);

    useEffect(() => {
        axios.get("admin/bets")
            .then(resp => {
                setAllBets(resp.data.data);
                console.log(resp.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    let currentPosts = allBets.slice(firstPostIndex, lastPostIndex);


    return (
        <div>
            <LeftSideSection />
            <div style={{ marginInline: 20, marginTop: 80, textAlign: 'center' }}>
                <h1>Bets Records</h1>
                <Table style={{ textAlign: 'center' }} className='' responsive>
                    <tbody>
                        {
                            (currentPosts && currentPosts.length > 0) &&
                            currentPosts.map((item, index) => {
                                let result = item.didWon ? "win" : "fail"
                                return (
                                    <tr key={item.periodId + index}>
                                        <Accordion>
                                            <Accordion.Item eventKey={"0"} className="accordionItem">
                                                <Accordion.Header>
                                                    <div className="kd_t5">
                                                        <p className="res_text">{item.periodId}</p>
                                                        <p style={{ color: (item.didWon) ? "green" : "red" }} className="res_text">{result}</p>
                                                        <p style={{ color: (item.didWon) ? "green" : "red" }} className="res_text">{item.didWon ? "+" : "-"}{item.resultAmount || item.betAmount}</p>
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body style={{ padding: "10px 16px", boxShadow: "0px 1px 1px 1px lightGrey" }}>
                                                    <div className="myParity statusDetails">
                                                        <h4 className="myParity_title">Bet Detail</h4>
                                                        <p className="results" >
                                                            <span>Period</span>
                                                            <span>{item.periodId}</span>
                                                        </p>
                                                        <p className="results" >
                                                            <span>Contract Money</span>
                                                            <span>{item.totalAmount}</span>
                                                        </p>
                                                        <p className="results" >
                                                            <span>Delivery</span>
                                                            <span>{item.betAmount}</span>
                                                        </p>
                                                        <p className="results" >
                                                            <span>Fee</span>
                                                            <span>{item.totalAmount * 0.05}</span>
                                                        </p>
                                                        <p className="results" >
                                                            <span>Result</span>
                                                            <span>
                                                                {item.resultNumber}
                                                                {
                                                                    item.resultColor && item.resultColor.split(" ").map(color => {
                                                                        return <span key={color} style={{ color: color }}> {color} </span>
                                                                    })
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className="results" >
                                                            <span>Select</span>
                                                            <span style={{ color: item.prediction }} >{item.prediction}</span>
                                                        </p>
                                                        <p className="results" >
                                                            <span>Status</span>
                                                            <span>{result}</span>
                                                        </p>
                                                        <p className="results" >
                                                            <span>Create Time</span>
                                                            <span>{item.createdAt}</span>
                                                        </p>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

                <Pagination
                    totalPosts={allBets.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default memo(MyRecord);
