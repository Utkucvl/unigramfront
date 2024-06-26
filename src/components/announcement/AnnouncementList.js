import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Card } from 'antd';
import { getAnnouncements } from "../../store/announcementSlice";
import AnnouncementModal from "./AnnouncementModal";
import { getImageByIdAnnouncement } from "../../store/imageSlice";

function AnnouncementList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const announcements = useSelector((state) => state.announcement.announcements);
  const isAuthenticated = useSelector((state) => state.security.isAuthenticated);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [imageSources, setImageSources] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAnnouncements());
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchImages = async () => {
      const sources = {};
      await Promise.all(announcements.map(async (announcement) => {
        const result = await dispatch(getImageByIdAnnouncement(announcement)); 
        sources[announcement.id] = result.payload.base64Image;
      }));
      setImageSources(sources);
    };

    fetchImages();
  }, [dispatch, announcements]);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    if (isAuthenticated) {
      setModalVisible(true);
    } else {
      navigate("/signin");
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px',backgroundColor: '#f5f5f5'}}>
      {announcements.map((announcement) => (
        <Card
          key={announcement.id}
          hoverable
          style={{ width: 240, height: 320, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: "10" }}
          cover={<img alt="announcement" src={imageSources[announcement.id]} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />}
          onClick={() => handleAnnouncementClick(announcement)}
        >
          <div style={{ padding: '10px' }}>
            <Card.Meta title={announcement.title} style={{ marginBottom: '10px' }} />
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
              {announcement.content}
            </p>
          </div>
        </Card>
      ))}
      <AnnouncementModal
        announcement={selectedAnnouncement}
        visible={modalVisible && isAuthenticated}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}

export default AnnouncementList;
