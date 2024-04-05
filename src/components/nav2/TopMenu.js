import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import './Navbar2.css';
import narfoto from './nar.png';

const TopMenu = () => {
  const isLoggedIn = useSelector((state) => state.security.isAuthenticated);
  const [, , removeCookie] = useCookies(['userData']);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    removeCookie('userData');
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={narfoto} alt="UniGram Logo" className="logo"/>
        UniGram
      </div>
      <div className="nav-menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/activities" className="nav-link">Activities</Link>
        <Link to="/announcement" className="nav-link">Announcements</Link>
        <Link to="/pastactivity" className="nav-link">Past Activities</Link>

        {isLoggedIn ? (
          <Link to="/myactivities" className="nav-link">My Activities</Link>
        ) : (
          <Link to="/signin" className="nav-link">My Activities</Link>
        )}
        {isLoggedIn ? (
          <span className="nav-link" onClick={showModal}>Log Out</span>
        ) : (
          <Link to="/signin" className="nav-link">Log In</Link>
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
