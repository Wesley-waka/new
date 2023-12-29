import React from 'react';
import './PractitionerCalendar.css';
import PractitionerSideBar from '../PractitionerSideBar/PractitionerSideBar';
import { useNavigate } from 'react-router-dom';

function PractitionerCalendar({loggedIn, userType}) {
  const history = useNavigate()

  if (loggedIn) {
    if (userType == "patient") {
      history('/patients/me')
    } else if (userType == "admin") {
      history('/admin/me')
    }
  } else {
    history('/login')
  }

  return (
    <div className='practitioner-calendar-main-container'>
      <PractitionerSideBar />
      <div className='practitioner-calendar-container'>
        <h1>Practitioner Calendar</h1>
      </div>
    </div>
  );
}

export default PractitionerCalendar;
