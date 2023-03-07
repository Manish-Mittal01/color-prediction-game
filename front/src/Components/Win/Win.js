import React, { useEffect, useState } from 'react'
import './Win.css'
import Winnavbar from './Winnavbar'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from '../../axios/axios';
import MyVerticallyCenteredModal from './MyVarticallyCenteredModal';
import MyRecord from './MyRecord';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TableRecord from './Tablerecord'
import jwt from 'jwt-decode';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';
import { blockUser } from '../../common/blockUser';


const Win = () => {
  const [periods, setPeriods] = useState({
    Parity: "",
    Sapre: "",
    Bcone: "",
    Emred: ""
  });
  const [records, setRecords] = useState({
    parityRecords: [],
    sapreRecords: [],
    bconRecords: [],
    emredRecords: []
  });
  const [err, setErr] = useState();
  const [tab, setTab] = useState("Parity");
  const [time, setTime] = useState({ min: "0", sec: "00" });
  const [betNumber, setBetNumber] = useState(1)
  const [amount, setAmount] = useState(10);
  const [prediction, setPrediction] = useState("");
  const [periodHistory, setPeriodHistory] = useState({})
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [check, setCheck] = useState(false);
  const [wallet, setWallet] = useState(0)


  let user = JSON.parse(localStorage.getItem("user"))
  let userData = user && jwt(user.token);

  const navigate = useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    getBets();
    userWallet(userData.userId)
  }, []);

  function userWallet(userId) {
    axios.get(`user/wallet?userId=${userId}`)
      .then(resp => {
        let data = resp.data.data
        let walletDetails = {
          totalAmount: data.totalAmount,
          referralAmount: data.referralAmount,
          withdrawableAmount: data.withdrawableAmount
        }
        setWallet(walletDetails)
      })
      .catch(err => console.log(err))
  }

  async function getBets() {
    await axios.get(`bet?userId=${userData.userId}`)
      .then(resp => {
        console.log(resp.data)
        let parityRecords = resp.data.data.filter(item => item.periodName === "Parity")
        let sapreRecords = resp.data.data.filter(item => item.periodName === "Sapre")
        let bconRecords = resp.data.data.filter(item => item.periodName === "Bcone")
        let emredRecords = resp.data.data.filter(item => item.periodName === "Emred")
        setRecords({
          Parity: parityRecords,
          Sapre: sapreRecords,
          Bcone: bconRecords,
          Emred: emredRecords
        });

        userWallet(userData.userId);

      })
      .catch(err => {
        console.log(err)
        err.response && setErr(err.response.data)
        blockUser({ errMsg: err.response.data.message, navigate: navigate })

      });
  }

  function makeBet(prediction) {
    setShow(true);
    setPrediction(prediction)
  };

  async function confirmBet() {
    const betDetails = {
      prediction,
      amount: amount * betNumber,
      userId: userData.userId,
      periodId: periods[tab]?.periodId,
      periodName: tab
    }

    await axios.post("bet", betDetails)
      .then(resp => {
        alert("order succes");
        userWallet(userData.userId);
      })
      .catch(err => {
        err.response && setErr(err.response.data)
        err.response && blockUser({ errMsg: err.response.data.message, navigate: navigate });
        alert(err.response.data.message)
        console.log(err)
      });

    setBetNumber(1);
    setAmount(10);
    setPrediction("")

    handleClose();

    getBets();
  };

  let disabled = time.min === "00" && time.sec < 30;

  return (
    <>
      <Winnavbar wallet={wallet} />
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
        <Tab eventKey="Bcone" title="Bcone">  </Tab>
        <Tab eventKey="Emred" title="Emred" > </Tab>
      </Tabs>
      {/* end */}

      <Timer
        periods={periods}
        setPeriods={setPeriods}
        periodHistory={periodHistory}
        setPeriodHistory={setPeriodHistory}
        time={time}
        setTime={setTime}
        tab={tab}
        getBets={getBets}
      />

      <div className='join_btns'>
        <button disabled={disabled} className={disabled ? "join_green disabled" : 'join_green'} onClick={() => makeBet("green")} > Join Green </button>
        <button disabled={disabled} className={disabled ? "Join_Violet disabled" : 'Join_Violet'} onClick={() => makeBet("violet")}>  Join Violet  </button>
        <button disabled={disabled} className={disabled ? "join_red disabled" : 'join_red'} onClick={() => makeBet("red")}> Join Red </button>
      </div>

      <div className='input_value'>
        <div className='first_row'>
          <button disabled={disabled} className={disabled ? "enter_value disabled" : 'enter_value'} onClick={() => makeBet("0")}>0</button>
          <button disabled={disabled} className={disabled ? "enter_value disabled" : 'enter_value'} onClick={() => makeBet("1")}>1</button>
          <button disabled={disabled} className={disabled ? "enter_value disabled" : 'enter_value'} onClick={() => makeBet("2")}>2</button>
          <button disabled={disabled} className={disabled ? "enter_value disabled" : 'enter_value'} onClick={() => makeBet("3")}>3</button>
          <button disabled={disabled} className={disabled ? "enter_value disabled" : 'enter_value'} onClick={() => makeBet("4")}>4</button>
        </div>
        <div className='secound_row'>
          <button disabled={disabled} className={disabled ? "enter_value disabled" : 'enter_value'} onClick={() => makeBet("5")}>5</button>
          <button disabled={disabled} className={disabled ? "enter_value disabled" : 'enter_value'} onClick={() => makeBet("6")}>6</button>
          <button disabled={disabled} className={disabled ? "enter_value disabled" : 'enter_value'} onClick={() => makeBet("7")}>7</button>
          <button disabled={disabled} className={disabled ? "enter_value disabled" : 'enter_value'} onClick={() => makeBet("8")}>8</button>
          <button disabled={disabled} className={disabled ? "enter_value disabled" : 'enter_value'} onClick={() => makeBet("9")}>9</button>
        </div>

      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header className='green_header' closeButton>
          <Modal.Title >Join {prediction}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='title_dash'>Contract Money</p>
          <div>
            <button className={amount === 10 ? "numbnerBtn acticeTab" : "numbnerBtn"} onClick={() => setAmount(10)} >10</button>
            <button className={amount === 100 ? "numbnerBtn acticeTab" : "numbnerBtn"} onClick={() => setAmount(100)} >100</button>
            <button className={amount === 1000 ? "numbnerBtn acticeTab" : "numbnerBtn"} onClick={() => setAmount(1000)} >1000</button>
          </div>
          <div className='betNumberWrapper'>
            <button className='numbnerBtn' onClick={() => { betNumber > 1 && setBetNumber(betNumber - 1) }} ><AiOutlineMinus /></button>
            <p>{betNumber}</p>
            <button className='numbnerBtn' onClick={() => setBetNumber(betNumber + 1)} ><BsPlus fontSize={20} /></button>
          </div>

          <p className='title_dash'>Total contract money is {betNumber * amount}</p>
          <span className='wrap_checkbox' >  <Form.Check onChange={() => setCheck(!check)} checked={check} aria-label="option 1" /><span className="checkbox_cus">I agree <span onClick={() => setModalShow(true)} className="rule">PRESALE RULE</span></span></span>
        </Modal.Body>
        <Modal.Footer>
          <Button closeButton onClick={handleClose} style={{ color: '#00897b', marginRight: "10px", fontSize: "" }}>
            CANCEL
          </Button>
          <Button onClick={confirmBet} className='signin' style={{ color: '#00897b' }} disabled={!check}  >
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      {
        periodHistory[tab] &&
        <TableRecord history={periodHistory[tab]} tab={tab} />
      }
      {
        <MyRecord tab={tab} records={records} periods={periods} />
      }

    </>
  )
}

export default Win