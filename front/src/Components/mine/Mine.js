import React from 'react'
import Minenav from './Minenav'
import './Mine.css'
import Dashboeard from '../Dashboard/Dashboeard'
import Logoutdashboard from '../Dashboard/Logoutdas/Logoutdashboard'
const Mine = () => {
  return (
    <>
      <Minenav />
      <br />
      <Dashboeard />
      <Logoutdashboard />
    </>
  )
}

export default Mine
