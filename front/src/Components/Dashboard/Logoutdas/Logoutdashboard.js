import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Logoutcss.css'
const Logoutdashboard = () => {
  const navigate = useNavigate()
  function logout() {
    navigate("/login");
    localStorage.removeItem("authToken")
  }
  return (
    <>
      <div className="goout_box">
        <button onClick={logout} className="ripplegrey">Logout</button>
      </div>
    </>
  )
}

export default Logoutdashboard
