import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import Dashboeard from './Components/Dashboard/Dashboeard';
import Win from './Components/Win/Win';
import Login from './Components/Login/Login';
import Navlogin from './Components/Login/Navlogin';
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="/dashboard" element={<Auth Comp={Dashboeard} />} /> */}
          <Route path="/win" element={<Auth Comp={Win} />} />
          <Route path="/login" element={<AuthLogin Comp={Login} />} />
          {/* <Route path="/login-nav" element={<Navlogin />} /> */}
          <Route path="/register" element={<AuthLogin Comp={Register} />} />
          <Route path="/resetpassword" element={<AuthLogin Comp={Resetpassword} />} />
          <Route path="/mine" element={<Auth Comp={Mine} />} />
          <Route path="/policies" element={<Auth Comp={Policies} />} />
          <Route path="/riskmanagements" element={<Auth Comp={Riskmanagement} />} />
          <Route path="/Complaints" element={<Auth Comp={Complaints} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
