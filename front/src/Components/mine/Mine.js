import React, { useEffect } from 'react';
import Minenav from './Minenav';
import './Mine.css';
import Dashboeard from '../Dashboard/Dashboeard';
import Logoutdashboard from '../Dashboard/Logoutdas/Logoutdashboard';
import userId from '../../common/userId';
import { useNavigate } from 'react-router-dom';

const Mine = ({ wallet }) => {
  const userData = userId();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData) return navigate("/login");
  });

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

