import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import Win from './Components/Win/Win';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Resetpassword from './Components/Resetpassword/Resetpassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Mine from './Components/mine/Mine';
import Auth from './Components/Auth/Auth';
import AuthLogin from './Components/Auth/AuthLogin';
import Policies from './Components/Dashboard/policies/Policies';
import Riskmanagement from './Components/Dashboard/riskmanagement/Riskmanagement';
import Complaints from './Components/Dashboard/complaints/Complaints';
import Recharge from './Components/Recharge/Recharge';
import Recharge_Record from './Components/Recharge/Recharge_Record';
import Orders from './Components/Orders/Orders';
import Withdrawal from './Components/withdrawal/Withdrawal';
import Transactions from './Components/transaction/Transaction';
import Promotion from './Components/Promotion/Promotion';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<AuthLogin Comp={Login} />} />
          <Route path="/register" element={<AuthLogin Comp={Register} />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/win" element={<Auth Comp={Win} />} />
          <Route path="/mine" element={<Auth Comp={Mine} />} />
          <Route path="/policies" element={<Auth Comp={Policies} />} />
          <Route path="/riskmanagements" element={<Auth Comp={Riskmanagement} />} />
          <Route path="/Complaints" element={<Auth Comp={Complaints} />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/transaction" element={<Transactions />} />
          <Route path="/RechargeRecord" element={<Recharge_Record />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Promotion" element={<Promotion />} />



          {/* 
          <Route path="/TendParity" element={<TendParity />}/>
          <Route path="/Reward" element={<Reward />}/>
          <Route path="/Bonus" element={<Bonus />}/>
          <Route path="/apply-record" element={<ApplyRecord />}/>
          <Route path="/RedEnvelope" element={<RedEnvelope />}/>
          <Route path="/AddBankCard" element={<AddBankCard />}/>
          <Route path="/Bankcard" element={<Bankcard />}/>
           */}



        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

