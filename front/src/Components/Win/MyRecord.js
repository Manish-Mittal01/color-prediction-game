import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import { Collapse } from 'react-collapse';

import { BsFillFileTextFill } from "react-icons/bs";
const MyRecord = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className='p_records'>
                <BsFillFileTextFill />
                <p>Parity Record</p>
            </div>
            <div className='toggle_cus'>
                <Collapse isOpened={true || false}>
                    <div>Random content</div>
                </Collapse>
            </div>
        </>
    )
}

export default MyRecord