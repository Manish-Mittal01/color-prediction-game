import React from 'react'
import Minenav from './Minenav'
import './Mine.css'
import Dashboeard from '../Dashboard/Dashboeard'
import Logoutdashboard from '../Dashboard/Logoutdas/Logoutdashboard'
const Mine = ({ wallet }) => {
  return (
    <>
      <Minenav wallet={wallet} />
      <br />
      <Dashboeard />
      <Logoutdashboard />
    </>
  )
}

export default Mine
