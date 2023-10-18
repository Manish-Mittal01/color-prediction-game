import React, { memo, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { GoPrimitiveDot } from "react-icons/go";
import axios from "../../axios/axios";
import winicon from "../../images/download.png";
import { MyPagination } from "./Pagination";

function TableRecord({ tab, updateTimer }) {
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      global.showLoader();

      await axios
        .get(`period/history?page=${page}`)
        .then((resp) => {
          const { data } = resp.data;
          setHistory(data[tab]);
        })
        .catch((err) => {
          console.log("error", err);
        });

      global.hideLoader();
    })();
  }, [updateTimer, tab, page]);

  return (
    <>
      <div className="p_records">
        <img src={winicon} alt="React Logo" />
        <p>{tab} Record</p>
      </div>
      <Table style={{ textAlign: "center" }} className="" responsive>
        <thead>
          <tr>
            <th>Period</th>
            <th>Price</th>
            <th>Number</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {history?.map((item, index) => {
            const newItem =
              index === 0 && page === 1
                ? {
                    expiredAt: item.expiredAt,
                    periodId: item.periodId,
                    price: "",
                    resultColor: "",
                    resultNumber: "",
                    startTime: item.startTime,
                  }
                : {
                    expiredAt: item.expiredAt,
                    periodId: item.periodId,
                    price: item.price,
                    resultColor: item.resultColor,
                    resultNumber: item.resultNumber,
                    startTime: item.startTime,
                  };

            return (
              <tr key={newItem.periodId}>
                <td>{newItem.periodId}</td>
                <td>{newItem.price}</td>
                <td>{newItem.resultNumber}</td>
                <td>
                  {newItem.resultColor &&
                    newItem.resultColor.split(" ").map((color) => (
                      <span
                        key={color}
                        className="c_red"
                        style={{ color: color }}
                      >
                        <GoPrimitiveDot style={{ width: 20, height: 20 }} />
                      </span>
                    ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <MyPagination page={page} setPage={setPage} totalPosts={200} />
    </>
  );
}

export default memo(TableRecord);
