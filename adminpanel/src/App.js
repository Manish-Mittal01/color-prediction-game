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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth Comp={Home} />} />
          <Route path="/admin" element={< Auth Comp={Home} />} />
          <Route path="/users" element={< Auth Comp={User} />} />
          <Route path="/withdraw_requests" element={<Auth Comp={WithdrwaRequests} />} />
          {/* <Route path="/recharge_requests" element={<DepositRequests />} /> */}
          <Route path="/recharge_requests" element={<Auth Comp={DepositRequests} />} />
          <Route path="/log_out" element={<Auth Comp={Logout} />} />
          <Route path="/setPrediction" element={< Auth Comp={NextPrediction} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
