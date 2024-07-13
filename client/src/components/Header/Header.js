import React from 'react';
import './Header.css'; 
import logo from '../../SecqureOne-Logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <a href="#" className="d-flex align-items-center">
          <img src= {logo} alt="Logo" className="img-fluid" />
          <p>Hello, Dashboard</p>
        </a>
      </div>
    </header>
  );
};

export default Header;
