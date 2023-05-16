import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import 'font-awesome/css/font-awesome.min.css';
import Home from './components/home/Home'
import User from './components/users/User';
import WithdrwaRequests from './components/withdrawRequest/WithdrwaRequests';
import DepositRequests from './components/depositRequests/DepositRequests';
import Logout from './components/logout/Logout';
import NextPrediction from './components/prediction/NextPrediction';
import Auth from './components/auth/Auth';
import Login from './components/login/Login';
import WithdrawRecords from './components/withdraw_records/WithdrawRecords';
import RechargeRecord from './components/recharge_records/RechargeRecord';
import BlockUser from './components/block_user/BlockUser';
import InviteRecords from './components/invite_records/InviteRecords';
import BetRecords from './components/bet_records/BetRecords';
import UserDetails from './components/user_records/UserDetails';
import UserReport from './components/user_records/UserReport';
import jwt from 'jwt-decode';
import { useContext } from 'react';
import context from './context/context/context';

function App() {
  const userData = localStorage.getItem("winmallAdmin");
  const [admin, setAdmin] = useContext(context);
  const user = admin ? jwt(admin.token) : userData ? jwt(JSON.parse(userData).token) : "";

  const limitAccess = user.mobile === "8059042829"

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth Comp={Home} />} />
        <Route path="/admin" element={< Auth Comp={Home} />} />
        <Route path="/users" element={< Auth Comp={User} />} />
        <Route path="/withdrawRecord" element={<Auth Comp={WithdrawRecords} />} />
        <Route path="/rechargeRecord" element={<Auth Comp={RechargeRecord} />} />
        {!limitAccess &&
          <>
            <Route path="/withdraw_requests" element={<Auth Comp={WithdrwaRequests} />} />
            <Route path="/recharge_requests" element={<Auth Comp={DepositRequests} />} />
          </>
        }

        <Route path="/invite_records" element={<Auth Comp={InviteRecords} />} />
        <Route path="/bet_records" element={<Auth Comp={BetRecords} />} />
        <Route path="/log_out" element={<Auth Comp={Logout} />} />
        <Route path="/setPrediction" element={< Auth Comp={NextPrediction} />} />
        <Route path="/blockUser" element={< Auth Comp={BlockUser} />} />
        <Route path="/userdetails" element={< Auth Comp={UserDetails} />} />
        <Route path="/report" element={< Auth Comp={UserReport} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
