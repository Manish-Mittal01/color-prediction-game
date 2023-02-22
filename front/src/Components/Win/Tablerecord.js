import React from 'react'
import { Table } from 'react-bootstrap'
import { GoPrimitiveDot } from "react-icons/go";
import winicon from '../../images/download.png';
function table() {
    return (
        <>
            <div className='p_records'>
                <img src={winicon} alt="React Logo" />
                <p>Parity Record</p>
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
                    <tr>
                        <td>20230135577</td>
                        <td>41584</td>
                        <td className='c_code'>5</td>
                        <td><span className='c_red'> <GoPrimitiveDot /></span></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default table;