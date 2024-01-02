import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import CovidLineGraph from './Graph';
import './Admin.css';

// function Admin () {
const AllPractitioners = ({ loggedIn, userType }) => {
  // const [users, setUsers] = useState([])
  const [pracs, setPracs] = useState([]);
  const [products, setProducts] = useState([]);
  const history = useNavigate();
  // console.log(users)

  if (loggedIn) {
    if (userType === 'practitioner') {
      history('/practitioners/me');
    } else if (userType === 'patient') {
      history('/patients/me');
    }
  } else {
    history('/login');
  }

  // const loadUser = () => {
  //   const result = axios.get('/practitioner_profiles');
  //   setUsers(result.data);
  // };

  // Fetches all practitioners & Products
  useEffect(() => {
    fetch(`https://new-back.fly.dev/practitioner_profiles`)
      .then((r) => r.json())
      .then((d) => setPracs(d));

    fetch(`https://new-back.fly.dev/products`)
      .then((r) => r.json())
      .then((d) => setProducts(d));
  }, []);

  return (
    <div className='all-dashboards-main-container'>
      <AdminSidebar />
      <main className='main-container' >
        <div className='main-title'>
          <h1 className='font-weight-bold'>DASHBOARD</h1>
        </div>

        <div className='main-cards'>
          <div className='card'>
            <div className='card-inner'>
              <p className='text-primary'>PRODUCTS IN STORE</p>
            </div>
            <span className='text-primary font-weight-bold'>{products.length}</span>
          </div>

          <div className='card'>
            <div className='card-inner'>
              <p className='text-primary'>ORDERS TO BE COMPLETED</p>
            </div>
            <span className='text-primary font-weight-bold'>3</span>
          </div>

          <div className='card'>
            <div className='card-inner'>
              <p className='text-primary'>AVAILABLE APPOINTMENTS</p>
            </div>
            <span className='text-primary font-weight-bold'>9</span>
          </div>

          <div className='card'>
            <div className='card-inner'>
              <p className='text-primary'>AVAILABLE PRACTITIONERS</p>
            </div>
            <span className='text-primary font-weight-bold'>{pracs.length}</span>
          </div>
          <div></div>
        </div>
        <div className='charts'>
          <div>
            <div className='chart-title'>
              Number of patients joining NewLife Hospital monthly (as of 2022)
            </div>
            <br />
            <CovidLineGraph />
          </div>
        </div>
      </main>
      <div className='MainDash'></div>
    </div>
  );
};

// export default Admin;
export default AllPractitioners;
