import React, { memo, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { GoPrimitiveDot } from "react-icons/go";
import winicon from '../../images/download.png';
import Pagination from './Pagination';

function TableRecord({ history, tab }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = history.previousResults.slice(firstPostIndex, lastPostIndex);


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
                        (currentPosts?.length > 0) &&
                        currentPosts.map((item, index) => (
                            <tr key={item.period + index}>
                                <td>{item.period}</td>
                                <td>{item.price}</td>
                                <td className='c_code'>{item.number}</td>
                                <td>
                                    <span className='c_red' style={{ color: item.result }}>
                                        <GoPrimitiveDot style={{ width: 20, height: 20 }} />
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Pagination
                totalPosts={history?.previousResults.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    )
}

export default memo(TableRecord)