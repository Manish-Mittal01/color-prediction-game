import React, { useEffect, useState } from 'react'
import './Win.css'
import Winnavbar from './Winnavbar'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { GiTargetPrize } from "react-icons/gi";
import axios from '../../axios/axios';
import MyVerticallyCenteredModal from './MyVarticallyCenteredModal';
import MyRecord from './MyRecord';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TableRecord from './Tablerecord'
import jwt from 'jwt-decode';


const Win = () => {
  const [periods, setPeriods] = useState([]);
  const [err, setErr] = useState();
  const [tab, setTab] = useState("Parity");
  const [timer, setTimer] = useState(0);
  const [time, setTime] = useState({ min: "0", sec: "00" });
  const [updateTimer, setUpdateTimer] = useState(false);

  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.post('user/callperiods')
      .then(function (response) {
        let data = response.data.data;
        setPeriods(data);
        setTimer(response.data.timer)
      })
      .catch(err => setErr(err));
  }, [updateTimer]);

  useEffect(() => {
    if (timer <= 0) return setUpdateTimer(!updateTimer);
    const interval = setInterval(() => {
      let newTimer = Math.floor(timer / 1000)
      let sec = newTimer % 60
      let min = (newTimer - sec) / 60;
      setTime({ min: min, sec: sec });
      setTimer(prev => prev - 1000)
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  function makeBet(prediction) {
    const user = JSON.parse(localStorage.getItem("user"))
    const userData = jwt(user.token)

    const betDetails = {
      prediction,
      amount: "",
      user: userData.user_code,
      period: periods[tab]?.currentPeriod.period,
      periodName: tab
    }
    axios.post("user/makebet")
      .then(resp => {
        console.log(resp.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Winnavbar />
      {/* tabs */}
      <Tabs
        id="fill-tab-example"
        className="mb-3"
        activeKey={tab}
        onSelect={(key) => setTab(key)}
        fill
      >
        <Tab eventKey="Parity" title="Parity">  </Tab>
        <Tab eventKey="Sapre" title="Sapre">  </Tab>
        <Tab eventKey="Bcon" title="Bcone">  </Tab>
        <Tab eventKey="Emred" title="Emred" > </Tab>
      </Tabs>
      {/* end */}

      {
        periods[tab] &&
        <div className='main_buy_sell'>
          <div className='main_left_Period'>
            <p className='Period'><span className='Period_icon'><GiTargetPrize /></span><span className='Period_content'>Period</span></p>
            <p className='id_value'>{periods[tab]?.currentPeriod.period}</p>
          </div>
          <div className='main_right_count_down'>
            <p className='Count_Down_content'>Count Down</p>
            <p className='Count_Down'>
              <span >{time.min}</span>
              <span className='num'>:</span>
              <span>{time.sec}</span>
            </p>
          </div>
        </div>
      }

      <div className='join_btns'>
        <button className='join_green' onClick={() => makeBet("green")} > Join Green </button>
        <button className=' Join_Violet' onClick={() => makeBet("voilet")}>  Join Violet  </button>
        <button className='join_red' onClick={() => makeBet("red")}> Join Red </button>

      </div>

      <div className='input_value'>
        <div className='first_row'>
          <button className='enter_value' onClick={() => makeBet("0")}>0</button>
          <button className='enter_value' onClick={() => makeBet("1")}>1</button>
          <button className='enter_value' onClick={() => makeBet("2")}>2</button>
          <button className='enter_value' onClick={() => makeBet("3")}>3</button>
          <button className='enter_value' onClick={() => makeBet("4")}>4</button>
        </div>
        <div className='secound_row'>
          <button className='enter_value' onClick={() => makeBet("5")}>5</button>
          <button className='enter_value' onClick={() => makeBet("6")}>6</button>
          <button className='enter_value' onClick={() => makeBet("7")}>7</button>
          <button className='enter_value' onClick={() => makeBet("8")}>8</button>
          <button className='enter_value' onClick={() => makeBet("9")}>9</button>
        </div>

      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header className='green_header' closeButton>
          <Modal.Title >Join Green</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='title_dash'>Contract Money</p>
          <p className='title_dash'>Total contract money is 10</p>
          <span className='wrap_checkbox'>  <Form.Check aria-label="option 1" /><span class="checkbox_cus">I agree <span onClick={() => setModalShow(true)} class="rule">PRESALE RULE</span></span></span>
        </Modal.Body>
        <Modal.Footer>
          <Button closeButton onClick={handleClose} style={{ color: '#00897b', marginRight: "10px", fontSize: "" }}>
            CANCEL
          </Button>
          <Button className='signin' style={{ color: '#00897b' }}>
            SIGN IN
          </Button>
        </Modal.Footer>
      </Modal>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {
        periods[tab] &&
        <>
          <TableRecord history={periods[tab]} tab={tab} />
          <MyRecord tab={tab} />
        </>
      }

    </>
  )
}

export default Win