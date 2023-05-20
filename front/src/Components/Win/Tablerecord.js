import React, { memo, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { GoPrimitiveDot } from "react-icons/go";
import winicon from '../../images/download.png';
import Pagination from './Pagination';

function TableRecord({ history, tab }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);


    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    let currentPosts = history.slice(firstPostIndex, lastPostIndex);


    return (
        <>
            <div className='p_records'>
                <img src={winicon} alt="React Logo" />
                <p>{tab} Record</p>
            </div>
            <Table style={{ textAlign: 'center' }} className='' responsive>
                <thead>
                    <tr>
                        <th>Period</th>
                        <th>Price</th>
                        <th>Number</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (currentPosts && currentPosts?.length > 0) &&
                        currentPosts.map((item, index) => {

                            const newItem = index === 0 ? {
                                expiredAt: item.expiredAt,
                                periodId: item.periodId,
                                price: "",
                                resultColor: "",
                                resultNumber: "",
                                startTime: item.startTime,
                            } : {
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
                                                <span key={color} className='c_red' style={{ color: color }}>
                                                    <GoPrimitiveDot style={{ width: 20, height: 20 }} />
                                                </span>
                                            ))
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <Pagination
                totalPosts={history.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    )
}

export default memo(TableRecord)