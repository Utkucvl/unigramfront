import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAnnouncements } from "../../store/announcementSlice";
import AnnouncementModal from "./AnnouncementModal";

function AnnouncementList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const announcements = useSelector((state) => state.announcement.announcements);
  const isAuthenticated = useSelector((state) => state.security.isAuthenticated);
  const currentAnnouncement = useSelector((state) => state.announcement.currentAnnouncement);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAnnouncements());
    };
    fetchData();
  }, [dispatch, currentAnnouncement]);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    if (isAuthenticated) {
      setModalVisible(true);
    } else {
      navigate("/signin");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          fontWeight: "normal",
          color: "white",
          lineHeight: "1.2",
          position: "relative",
          zIndex: "2",
          fontFamily: "italic",
        }}
      >
        <div
          style={{
            marginBottom: "50px",
            height: "160px",
            backgroundImage:
              "url('http://www.agu.edu.tr/site/tpl/microsites/agu/images/kampus-parallax.jpg')",
            backgroundPosition: "center center",
            borderRadius: "25px",
            backgroundRepeat: "no-repeat",
            zIndex: "1",
            position: "relative",
            boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h2
              style={{
                fontSize: "48px",
                marginRight: "120vh",
                fontWeight: "lighter",
                width : "500px",
              }}
            >
              Announcements
            </h2>
          </div>
        </div>

        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            style={{ textAlign: "left", marginBottom: "10px", marginLeft:"15px", cursor: "pointer" }}
            onClick={() => handleAnnouncementClick(announcement)}
          >
            <h3
              style={{
                fontSize: "16px",
                marginBottom: "5px",
                color: "#b33b3c",
                fontFamily: "italic",
              }}
            >
              {announcement.title}
            </h3>
            <span
              style={{
                fontSize: "14px",
                marginLeft: "5px",
                textAlign: "left",
                color: "#999",
                fontFamily: "italic",
              }}
            >
              {String(announcement.announcementDate)}
            </span>
            <p
              style={{
                maxHeight: "84px",
                maxWidth: "700px",
                fontSize: "11px",
                marginBottom: "35px",
                overflow: "hidden",
                color: "#666666",
                fontFamily: "italic",
              }}
            >
              {announcement.content}
            </p>
          </div>
        ))}
      </div>
      <AnnouncementModal
        announcement={selectedAnnouncement}
        visible={modalVisible && isAuthenticated}
        onClose={closeModal}
      />
    </div>
  );
}

export default AnnouncementList;
