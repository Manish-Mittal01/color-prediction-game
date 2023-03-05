import React, { memo, useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { BsFillFileTextFill } from "react-icons/bs";
import Pagination from "./Pagination";
import { GoPrimitiveDot } from "react-icons/go";


const MyRecord = ({ tab, records, periods }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    let currentPosts = records[tab] && records[tab].slice(firstPostIndex, lastPostIndex);


    return (
        <>
            <div className="p_records">
                <BsFillFileTextFill style={{ height: 40, width: 30, marginBlock: "16px 8px" }} />
                <p>My Record</p>
            </div>

            <Table style={{ textAlign: 'center' }} className='' responsive>
                <tbody>
                    {
                        (records[tab] && records[tab].length > 0) &&
                        currentPosts.map((item, index) => {
                            let result = item.didWon ? "win" : "fail"
                            return (
                                <tr key={item.periodId + index}>
                                    <Accordion>
                                        <Accordion.Item eventKey={"0"} className="accordionItem">
                                            <Accordion.Header>
                                                <div className="kd_t5">
                                                    <p className="res_text">{item.periodId}</p>
                                                    <p style={{ color: (item.didWon) ? "green" : "red" }} className="res_text">{item.periodId !== periods[tab].periodId && result}</p>
                                                    <p style={{ color: (item.didWon) ? "green" : "red" }} className="res_text">{item.periodId !== periods[tab].periodId ? item.didWon ? "+" : "-" : ""}{item.periodId !== periods[tab].periodId && item.betAmount}</p>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body style={{ padding: "10px 16px", boxShadow: "0px 1px 1px 1px lightGrey" }}>
                                                <div className="myParity statusDetails">
                                                    <h4 className="myParity_title">Period Detail</h4>
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
                                                            {console.log(item.resultColor)}
                                                            {
                                                                item.resultColor && item.resultColor.split(" ").map(color => {
                                                                    return <span style={{ color: color }}> {color} </span>
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
                                                        <span>{item.periodId !== periods[tab].periodId && result}</span>
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
                totalPosts={records[tab] && records[tab].length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    );
};

export default memo(MyRecord);
