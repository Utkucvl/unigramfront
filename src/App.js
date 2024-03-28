import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "../src/components/auth/RegisterPage";
import LoginPage from "../src/components/auth/LoginPage";
import ProtectedRoute from "../src/components/api/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import LeftMenu from "../src/components/nav/LeftMenu";
import { Layout } from "antd";
import AnnouncementList from "./components/announcement/AnnouncementList";
import ActivityList from "./components/activity/ActivityList";
import './App.css';
const { Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Sider width={256} style={{ background: "#fff" }}>
                  <LeftMenu />
                </Sider>
                <Layout>
                  <Content>
                    <AnnouncementList />
                  </Content>
                </Layout>
              </Layout>
            }
          ></Route>
          <Route
            path="/activity"
            element={
              <Layout>
                <Sider width={256} style={{ background: "#fff" }}>
                  <LeftMenu />
                </Sider>
                <Layout>
                  <Content>
                    <ActivityList />
                  </Content>
                </Layout>
              </Layout>
            }
          ></Route>
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/signin" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
