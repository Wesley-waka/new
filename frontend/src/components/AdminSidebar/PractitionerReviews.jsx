import React from 'react';
import './PractitionerReviews.css';
import PractitionerSideBar from '../PractitionerSideBar/PractitionerSideBar';
import {  useNavigate } from 'react-router-dom';

function PractitionerReviews({loggedIn, userType}) {
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
    <div className='practitioner-reviews-main-container'>
      <PractitionerSideBar />
      <div className='practitioner-reviews-container'>
        {/* <h1>Practitioner Reviews</h1> */}
        <h1>Practitioner Reviews</h1>
      </div>
    </div>
  );
}

export default PractitionerReviews;
