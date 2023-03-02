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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Home />} />
          <Route path="/users" element={<User />} />
          <Route path="/withdraw_requests" element={<WithdrwaRequests />} />
          <Route path="/recharge_requests" element={<DepositRequests />} />
          <Route path="/log_out" element={<Logout />} />
          <Route path="/setPrediction" element={<NextPrediction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
