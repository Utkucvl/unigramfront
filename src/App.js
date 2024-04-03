import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RegisterPage from './components/auth/RegisterPage';
import LoginPage from './components/auth/LoginPage';
import AnnouncementList from './components/announcement/AnnouncementList';
import Navbar from './components/nav2/TopMenu'; // Navbar komponenti import edildi
import { Layout } from 'antd';
import MainPageContent from './components/MainPage/MainPage';
import ActivityList from './components/activity/ActivityList'; // ActivityList komponenti import edildi
import './App.css';

const { Content } = Layout;

// Wrapper komponenti useLocation hook'unu kullanmak için oluşturuldu
function LayoutWithNavbar({ children }) {
  const location = useLocation();
  // Navbar'ın gösterilip gösterilmeyeceğini belirleyin
  const showNavbar = ['/announcement', '/activities', '/'].includes(location.pathname);

  return (
    <Layout>
      {showNavbar && <Navbar />}
      <Content>{children}</Content>
    </Layout>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Tüm sayfa içeriğini LayoutWithNavbar ile sarmalayın */}
        <LayoutWithNavbar>
          <Routes>
            {/* Tek Routes komponenti ile tüm yolları tanımlayın */}
            <Route path="/" element={<MainPageContent />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/announcement" element={<AnnouncementList />} />
            <Route path="/activities" element={<ActivityList />} />
          </Routes>
        </LayoutWithNavbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
