import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";
import AnnouncementList from "./components/announcement/AnnouncementList";
import Navbar from "./components/nav2/TopMenu";
import MyActivities from "./components/myactivity/MyActivity ";
import NotMyActivity from "./components/myactivity/NotMyActivity";
import { Layout } from "antd";
import MainPageContent from "./components/MainPage/MainPage";
import ActivityList from "./components/activity/ActivityList";
import PastActivity from "./components/pastactivity/PastActivity";
import "./App.css";
import AdminPage from "./components/adminpage/homePageOfAdmin/AdminPage";
import AdminAnnouncement from "./components/adminpage/adminPageAnnouncement/AdminAnnouncement";
import AdminActivity from "./components/adminpage/adminPageActivity/AdminActivity";
import UploadImage from "./components/adminpage/homePageOfAdmin/uploadImage";
import UploadImageAnnouncement from "./components/adminpage/adminPageAnnouncement/uploadImageAnnouncement";
import UploadImageActivity from "./components/adminpage/adminPageActivity/uploadImageActivity";
import MyPastActivities from "./components/mypastactivity/MyPastActivity";
import ClubList from "./components/clubs/ClubList";
import MyClub from "./components/myclubs/MyClub";
import UploadImageClub from "./components/adminpage/adminPageClubs/uploadImageClub";
import AdminClubs from "./components/adminpage/adminPageClubs/AdminClubs";
import ActivityListForClub from "./components/activity/ActivityListForClub"

const { Content } = Layout;

function LayoutWithNavbar({ children }) {
  const location = useLocation();
  const showNavbar = [
    "/announcement",
    "/activities",
    "/",
    "/myactivities",
    "/notmyactivity",
    "/pastactivity",
    "/admin",
    "/adminactivity",
    "/adminannouncement",
    "/mypastactivities",
    "/clubs",
    "/myclub",
    "/adminclub",
    "/activitylist/:clubId"
  
  ].includes(location.pathname);

  return (
    <Layout>
      {showNavbar && <Navbar />}
      <Content style={{ padding: "0 50px" }}>{children}</Content>
    </Layout>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LayoutWithNavbar>
          <Routes>
            <Route path="/" element={<MainPageContent />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/announcement" element={<AnnouncementList />} />
            <Route path="/activities" element={<ActivityList />} />
            <Route path="/myactivities" element={<MyActivities />} />
            <Route path="/notmyactivity" element={<NotMyActivity />} />
            <Route path="/pastactivity" element={<PastActivity />} />
            <Route path="/clubs" element={<ClubList />} />
            <Route path="/myclub" element={<MyClub />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/adminclub" element={<AdminClubs />} />
            <Route
              path="/uploadImageClub/:clubId"
              element={<UploadImageClub />}
            />
            <Route
              path="/activitylist/:clubId"
              element={<ActivityListForClub />}
            />

            <Route path="/adminactivity" element={<AdminActivity />} />
            <Route path="/adminannouncement" element={<AdminAnnouncement />} />
            <Route path="/uploadImage" element={<UploadImage />} />
            <Route
              path="/uploadImageAnnouncement/:announcementId"
              element={<UploadImageAnnouncement />}
            />
            <Route
              path="/uploadImageActivity/:activityId"
              element={<UploadImageActivity />}
            />
            <Route path="/mypastactivities" element={<MyPastActivities/>}></Route>
          </Routes>
        </LayoutWithNavbar>
      </BrowserRouter>
    </div>
  );
}


export default App;
