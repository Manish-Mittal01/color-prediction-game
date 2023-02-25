
import './Dashboard.css'
import { IoBagCheckOutline } from "react-icons/io5";
import { RiFileListLine } from "react-icons/ri";
import { TfiBag } from "react-icons/tfi";
import { MdAccountBalanceWallet, MdAttachMoney, MdDownload, MdMessage, MdSecurity } from "react-icons/md";
import { BsCreditCard2Back } from 'react-icons/bs';
import { FaBuilding } from 'react-icons/fa';
import { BiMessageError } from "react-icons/bi";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Dashboeard = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='dashboard'>
        <div className='inner_data'>
          <ul>
            <li onClick={handleShow}>
              <ol>
                <IoBagCheckOutline />
                <span>Sign In</span>
              </ol>
            </li>
            {/* order */}
            <li>
              <ol>
                <RiFileListLine />
                <span onClick={() => navigate('/Orders')} >Orders</span>
              </ol>
            </li>
            {/* promotion */}
            <li>
              <ol>
                <TfiBag />
                <span onClick={() => navigate("/Promotion")} >Promotion</span>
              </ol>
            </li>
            {/* Red Envelope */}
            <li>
              <ol>
                <MdAttachMoney />
                <span>Red Envelope</span>
              </ol>
            </li>
            {/* Wallet  */}
            <li>
              <ol>
                <Accordion >
                  <Accordion.Item eventKey={"0"} className="accordionItem">
                    <Accordion.Header><MdAccountBalanceWallet /> Wallet</Accordion.Header>
                    <Accordion.Body style={{ padding: "10px 16px" }}>
                      <button className='accordionBtn' onClick={() => {
                        navigate("/recharge")
                      }}>Recharge</button><br />
                      <button className='accordionBtn' onClick={() => {
                        navigate("/withdrawal")
                      }}>Withdrawal</button><br />
                      <button className='accordionBtn' onClick={() => {
                        navigate("/transaction")
                      }}>Transactions</button>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </ol>
            </li>

            {/* Bank Card */}
            <li>
              <ol>
                <BsCreditCard2Back />
                <span>Bank Card</span>
              </ol>
            </li>
            {/* Address */}
            {/* <li>
              <ol>
                <FaBuilding />
                <span>Address</span>
              </ol>
            </li> */}
            {/* Account Security */}
            <li>
              <ol>
                <Accordion >
                  <Accordion.Item eventKey={"0"} className="accordionItem">
                    <Accordion.Header>  <MdSecurity /> Account Security</Accordion.Header>
                    <Accordion.Body style={{ padding: "10px 16px" }}>
                      <button className='accordionBtn' onClick={() => {
                        navigate("/resetpassword")
                      }}>Change Password</button>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </ol>
            </li>

            {/* App Download */}
            <li>
              <ol>
                <MdDownload />
                <span>App Download</span>
              </ol>
            </li>
            {/* Complaints & Suggestions */}
            <li>
              <ol>
                <MdMessage />
                <span onClick={() => navigate("/complaints")} >Complaints & Suggestions</span>
              </ol>
            </li>
            {/* About */}

            <li>
              <ol>
                <Accordion >
                  <Accordion.Item eventKey={"0"} className="accordionItem">
                    <Accordion.Header> <BiMessageError /> About</Accordion.Header>
                    <Accordion.Body style={{ padding: "10px 16px" }}>
                      <button className='accordionBtn' onClick={() => {
                        navigate("/policies")
                      }}>Privacy Ploicy</button><br />
                      <button className='accordionBtn' onClick={() => {
                        navigate("/riskmanagements")
                      }}>Risk Disclosure Agreement</button>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </ol>
            </li>
          </ul>
        </div>
      </div>




      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='title_dash'>Total：{ }</p>
          <p className='title_dash'>Today Rebates：₹ ：{ }</p>
          <p className='title_dash'>Total Rebates：₹ ：{ }</p>
          <p className='title_dash'>Status：{ }</p>

        </Modal.Body>
        <Modal.Footer>
          {/* <Button style={{color:'#00897b',marginRight:"10px"}}>
                       CANCEL
                    </Button> */}
          <Button className='signin' style={{ color: '#00897b' }}>
            SIGN IN
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Dashboeard
