import React, { useState } from "react";
import { LogoutOutlined, TeamOutlined, FileDoneOutlined, AlertOutlined, LoginOutlined } from "@ant-design/icons";
import { Menu, Switch, Modal } from "antd";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const LeftMenu = () => {
  const [current, setCurrent] = useState("sub0");
  const isLoggedIn = useSelector((state) => state.security.isAuthenticated);
  const [, , removeCookie] = useCookies(["userData"]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = (e) => {
    setCurrent(e.key);
    if (e.key === "sub3") {
      showLogoutConfirmation();
    }
  };

  const showLogoutConfirmation = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const logout = () => {
    // Local storage'daki accessToken ve userId'yi sil
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    removeCookie("userData");
    // Sayfayı yenile
    window.location.reload();
  };

  return (
    <>
      <Menu
        theme="dark"
        onClick={handleClick}
        style={{
          height: "100%", // Yüksekliği (boyutu) 737 piksel olarak ayarla
          width: 256, // Genişliği (boyutu) 256 piksel olarak sabit tut
        }}
        selectedKeys={[current]}
        mode="inline"
      >
        <Menu.Item key="sub0" icon={<AlertOutlined />}>
          <Link to="/">Announcement</Link>
        </Menu.Item>
        <Menu.Item key="sub1" icon={<TeamOutlined />}>
          <Link to="/activity">Activity</Link>
        </Menu.Item>
        {isLoggedIn ? (
          <Menu.Item key="sub3" icon={<LogoutOutlined />}>
            <span onClick={showLogoutConfirmation}>Logout</span>
          </Menu.Item>
        ) : (
          <Menu.Item key="sub3" icon={<LoginOutlined />}>
            <Link to="/signin">Login</Link>
          </Menu.Item>
        )}
      </Menu>
      <Modal
        title="Confirm Logout"
        visible={isModalVisible}
        onOk={logout}
        onCancel={handleCancel}
        okText="Logout"
        cancelText="Cancel"
      >
        Are you sure you want to logout?
      </Modal>
    </>
  );
};

export default LeftMenu;
