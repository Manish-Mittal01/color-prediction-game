import React, { memo, useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { BsFillFileTextFill } from "react-icons/bs";
import moment from "moment";
import { MyPagination } from "./Pagination";

const MyRecord = ({ tab, records, periods, betPage, setBetPage }) => {
  return (
    <>
      <div className="p_records">
        <BsFillFileTextFill
          style={{ height: 40, width: 30, marginBlock: "16px 8px" }}
        />
        <p>My Record</p>
      </div>

      <Table style={{ textAlign: "center" }} className="" responsive>
        <tbody>
          {records[tab]?.data &&
            records[tab].data?.map((item, index) => {
              let result = item.didWon ? "win" : "fail";
              return (
                <tr key={item.createdAt}>
                  <Accordion>
                    <Accordion.Item eventKey={"0"} className="accordionItem">
                      <Accordion.Header>
                        <div className="kd_t5">
                          <p className="res_text">{item.periodId}</p>
                          <p
                            style={{ color: item.didWon ? "green" : "red" }}
                            className="res_text"
                          >
                            {item.periodId !== periods[tab].periodId && result}
                          </p>
                          <p
                            style={{ color: item.didWon ? "green" : "red" }}
                            className="res_text"
                          >
                            {item.periodId !== periods[tab].periodId
                              ? item.didWon
                                ? "+"
                                : "-"
                              : ""}
                            {item.periodId !== periods[tab].periodId &&
                              (item.resultAmount || item.betAmount)}
                          </p>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body
                        style={{
                          padding: "10px 16px",
                          boxShadow: "0px 1px 1px 1px lightGrey",
                        }}
                      >
                        <div className="myParity statusDetails">
                          <h4 className="myParity_title">Period Detail</h4>
                          <p className="results">
                            <span>Period</span>
                            <span>{item.periodId}</span>
                          </p>
                          <p className="results">
                            <span>Contract Money</span>
                            <span>{item.totalAmount}</span>
                          </p>
                          <p className="results">
                            <span>Delivery</span>
                            <span>{item.betAmount}</span>
                          </p>
                          <p className="results">
                            <span>Fee</span>
                            <span>{item.totalAmount * 0.05}</span>
                          </p>
                          <p className="results">
                            <span>Result</span>
                            <span>
                              {item.resultNumber}
                              {item.resultColor &&
                                item.resultColor.split(" ").map((color) => {
                                  return (
                                    <span key={color} style={{ color: color }}>
                                      {color}
                                    </span>
                                  );
                                })}
                            </span>
                          </p>
                          <p className="results">
                            <span>Select</span>
                            <span style={{ color: item.prediction }}>
                              {item.prediction}
                            </span>
                          </p>
                          <p className="results">
                            <span>Status</span>
                            <span>
                              {item.periodId !== periods[tab].periodId &&
                                result}
                            </span>
                          </p>
                          <p className="results">
                            <span>Create Time</span>
                            <span>
                              {moment(item.createdAt).format(
                                "DD MM YYYY, HH:MM"
                              )}
                            </span>
                          </p>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <MyPagination
        page={betPage}
        setPage={setBetPage}
        totalPosts={records[tab]?.totalCount}
      />
    </>
  );
};

export default memo(MyRecord);
