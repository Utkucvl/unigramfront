import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import './Navbar2.css';
import narfoto from './nar.png';
import { useNavigate } from "react-router";

const TopMenu = () => {
  const isLoggedIn = useSelector((state) => state.security.isAuthenticated);
  const role = useSelector((state) => state.security.role);
  const [, , removeCookie] = useCookies(['userData']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    removeCookie('userData');
    navigate("/signin");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (localStorage.getItem("role") === 'ADMIN') {
    return (
      <div className="navbar">
        <div className="nav-logo">
          <img src={narfoto} alt="UniGram Logo" className="logo" />
          UniGram
        </div>
        <div className="nav-menu">
          <Link to="/adminactivity" className="nav-link">Activities</Link>
          <Link to="/adminannouncement" className="nav-link">Announcements</Link>
          <Link to="/adminclub" className="nav-link">Clubs</Link>

          <span className="nav-link" onClick={showModal}>Log Out</span>
        </div>
        <Modal
          title="Confirm Logout"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Logout"
          cancelText="Cancel"
        >
          Are you sure you want to logout?
        </Modal>
      </div>
    );
  }
  // For USER, render the full navigation

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={narfoto} alt="UniGram Logo" className="logo" />
        UniGram
      </div>
      <div className="nav-menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/activities" className="nav-link">Activities</Link>
        <Link to="/announcement" className="nav-link">Announcements</Link>
        <Link to="/pastactivity" className="nav-link">Past Activities</Link>

        {isLoggedIn ? (
          <Link to="/mypastactivities" className="nav-link">My Past Activities</Link>
        ) : (
          <Link to="/signin" className="nav-link">My Past Activities</Link>
        )}

        {isLoggedIn ? (
          <Link to="/myactivities" className="nav-link">My Activities</Link>
        ) : (
          <Link to="/signin" className="nav-link">My Activities</Link>
        )}
        <Link to="/clubs" className="nav-link">Clubs</Link>
        {isLoggedIn ? (
          <Link to="/myclub" className="nav-link">My Clubs</Link>
        ) : (
          <Link to="/signin" className="nav-link">My Clubs</Link>
        )}


        {isLoggedIn ? (
          <span className="nav-link" onClick={showModal} style={{ marginLeft: "" }}>Log Out</span>
        ) : (
          <Link to="/signin" className="nav-link" style={{ marginLeft: "" }}>Log In</Link>
        )}
      </div>
      <Modal
        title="Confirm Logout"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Logout"
        cancelText="Cancel"
      >
        Are you sure you want to logout?
      </Modal>
    </div>
  );
};

export default TopMenu;