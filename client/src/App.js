import React, { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import EmployeeGridComponent from './components/EmployeeGrid/EmployeeGridComponent';

function App() {
  return (
  <div>
    <Header/>
    <EmployeeGridComponent />
    <Footer/>
    <ToastContainer  />
  </div>
  );
}

export default App;
