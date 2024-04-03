import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar2.css'; // Make sure to create a CSS file with this name
import narfoto from './nar.png';
const TopMenu = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={narfoto} alt="UniGram Logo" className="logo"/>
        UniGram
      </div>
      <div className="nav-menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/activities" className="nav-link">Activities</Link> {/* Activities sayfasına giden linki ekleyin */}
        <Link to="/announcement" className="nav-link">Announcement</Link>
        <Link to="/signin" className="nav-link">Log In</Link>
      </div>
    </div>
  );
};

export default TopMenu;
