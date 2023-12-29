import React from 'react';
import './PatientCalendar.css';
import PatientSidebar from '../PatientSidebar/PatientSidebar';
import {  useNavigate } from 'react-router-dom';

function PatientCalendar({loggedIn, userType}) {
  const history = useNavigate()

  if (loggedIn) {
    if (userType == "practitioner") {
      history('/practitioners/me')
    } else if (userType == "admin") {
      history('/admin/me')
    }
  } else {
    history('/login')
  }

  return (
    <div className='patient-calendar-main-container'>
      <PatientSidebar />
      <div className='patient-calendar-container'>
      <h1>Patient Calendar</h1>
    </div>
    </div>
  );
}

export default PatientCalendar;
