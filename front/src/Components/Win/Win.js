import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./Win.css";
import Winnavbar from "./Winnavbar";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import axios from "../../axios/axios";
import MyVerticallyCenteredModal from "./MyVarticallyCenteredModal";
import MyRecord from "./MyRecord";
import TableRecord from "./Tablerecord";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";
import { blockUser } from "../../common/blockUser";
import userId from "../../common/userId";
import styles from "./Win.css";

const Win = () => {
  const [periods, setPeriods] = useState({
    Parity: "",
    Sapre: "",
    Bcone: "",
    Emred: "",
  });
  const [records, setRecords] = useState({
    parityRecords: [],
    sapreRecords: [],
    bconRecords: [],
    emredRecords: [],
  });
  const [tab, setTab] = useState("Parity");
  const [time, setTime] = useState({ min: "0", sec: "00" });
  const [betNumber, setBetNumber] = useState(1);
  const [amount, setAmount] = useState(20);
  const [prediction, setPrediction] = useState("");
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [disableBet, setDisableBet] = useState(false);
  const [updateTimer, setUpdateTimer] = useState(false);
  const [betPage, setBetPage] = useState(1);

  const navigate = useNavigate();
  let userData = userId();
  let disabled = time.min === "00" && time.sec < 30;

  const handleClose = () => setShow(false);

  async function userWallet(userId) {
    axios
      .get(`user/wallet?userId=${userId}`)
      .then((resp) => {
        let data = resp.data.data;
        let walletDetails = {
          totalAmount: data.totalAmount,
          referralAmount: data.referralAmount,
          withdrawableAmount: data.withdrawableAmount,
          bonusAmount: data.bonusAmount,
        };
        setWallet(walletDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getBets = async () => {
    await axios
      .get(`bet?userId=${userData.userId}&&page=${betPage}`)
      .then((response) => {
        const { parity, sapre, bcone, emred } = response.data?.data;
        setRecords({
          Parity: parity,
          Sapre: sapre,
          Bcone: bcone,
          Emred: emred,
        });
        userWallet(userData.userId);
      })
      .catch((err) => {
        console.log("errro", err);
        blockUser({ errMsg: err.response?.data.message, navigate: navigate });
      });
  };

  function makeBet(prediction) {
    setShow(true);
    setPrediction(prediction);
  }

  async function confirmBet() {
    setDisableBet(true);
    const betDetails = {
      prediction,
      amount: amount * betNumber,
      userId: userData.userId,
      periodId: periods[tab]?.periodId,
      periodName: tab,
    };

    await axios
      .post("bet", betDetails)
      .then((resp) => {
        toast.success("Order placed successfully");
        userWallet(userData.userId);
      })
      .catch((err) => {
        err.response &&
          blockUser({ errMsg: err.response.data.message, navigate: navigate });
        alert(err.response.data.message);
      });

    setBetNumber(1);
    setAmount(10);
    setPrediction("");
    handleClose();
    getBets();
    setBetPage(1);
    setDisableBet(false);
  }

  useEffect(() => {
    if (!userData) {
      return navigate("/login");
    }
    userWallet(userData.userId);
  }, []);

  useEffect(() => {
    (async () => {
      global.showLoader();
      await getBets();
      global.hideLoader();
    })();
  }, [betPage, updateTimer]);

  return (
    <>
      <Winnavbar wallet={wallet} />
      <Tabs
        id="fill-tab-example"
        className="mb-3"
        activeKey={tab}
        onSelect={(key) => {
          setTab(key);
          setBetPage(1);
        }}
        fill
      >
        <Tab eventKey="Parity" title="Parity">
          {" "}
        </Tab>
        <Tab eventKey="Sapre" title="Sapre">
          {" "}
        </Tab>
        {/* <Tab eventKey="Bcone" title="Bcone">  </Tab> */}
        {/* <Tab eventKey="Emred" title="Emred" > </Tab> */}
      </Tabs>

      <Timer
        periods={periods}
        setPeriods={setPeriods}
        time={time}
        setTime={setTime}
        tab={tab}
        updateTimer={updateTimer}
        setUpdateTimer={setUpdateTimer}
      />

      <div className="join_btns">
        <button
          disabled={disabled}
          className={disabled ? "join_green disabled" : "join_green"}
          onClick={() => makeBet("green")}
        >
          {" "}
          Join Green{" "}
        </button>
        <button
          disabled={disabled}
          className={disabled ? "Join_Violet disabled" : "Join_Violet"}
          onClick={() => makeBet("violet")}
        >
          {" "}
          Join Violet{" "}
        </button>
        <button
          disabled={disabled}
          className={disabled ? "join_red disabled" : "join_red"}
          onClick={() => makeBet("red")}
        >
          {" "}
          Join Red{" "}
        </button>
      </div>

      <div className="input_value">
        <div className="first_row">
          {[0, 1, 2, 3, 4].map((item) => (
            <button
              key={item}
              // style={{ backgroundColor: [1, 3].includes(item) ? "green" : [2, 4].includes(item) ? "red" : "", backgroundImage: item === 0 && "linear-gradient(45deg, red 50%, #9c27b0 50%)" }}
              disabled={disabled}
              className={disabled ? "enter_value disabled" : "enter_value"}
              onClick={() => makeBet(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="secound_row">
          {[5, 6, 7, 8, 9].map((item) => (
            <button
              key={item}
              // style={{ backgroundColor: [9, 7].includes(item) ? "green" : [6, 8].includes(item) ? "red" : "", backgroundImage: item === 5 && "linear-gradient(45deg, green 50%, #9c27b0 50%)" }}
              disabled={disabled}
              className={disabled ? "enter_value disabled" : "enter_value"}
              onClick={() => makeBet(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header className="green_header" closeButton>
          <Modal.Title>Join {prediction}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="title_dash">Contract Money</p>
          <div>
            {[20, 100, 1000].map((item) => (
              <button
                key={item}
                className={
                  amount === item ? "numbnerBtn acticeTab" : "numbnerBtn"
                }
                onClick={() => setAmount(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="betNumberWrapper">
            <button
              className="numbnerBtn"
              onClick={() => {
                betNumber > 1 && setBetNumber(betNumber - 1);
              }}
            >
              <AiOutlineMinus />
            </button>
            <p>{betNumber}</p>
            <button
              className="numbnerBtn"
              onClick={() => setBetNumber(betNumber + 1)}
            >
              <BsPlus fontSize={20} />
            </button>
          </div>

          <p className="title_dash">
            Total contract money is {betNumber * amount}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            closeButton
            onClick={handleClose}
            style={{ color: "#00897b", marginRight: "10px", fontSize: "" }}
          >
            CANCEL
          </Button>
          <Button
            onClick={confirmBet}
            disabled={disableBet}
            className={`${styles.confirmBet} signin`}
            style={{ color: "#00897b" }}
          >
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <TableRecord tab={tab} updateTimer={updateTimer} />

      <MyRecord
        tab={tab}
        records={records}
        periods={periods}
        betPage={betPage}
        setBetPage={setBetPage}
      />
    </>
  );
};

export default Win;
