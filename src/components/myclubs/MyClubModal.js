import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from "react-redux";
import { leaveClub } from "../../store/myClubSlice";
import { getImageByIdClub } from "../../store/imageSlice";
import { useNavigate } from 'react-router-dom';

function MyClubModal({ club, visible, onClose }) {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (club && visible) {
      const fetchImage = async () => {
        const result = await dispatch(getImageByIdClub({ id: club.id }));
        if (result.payload && result.payload.base64Image) {
          setImageSrc(result.payload.base64Image);
        }
      };

      fetchImage();
    }
  }, [club, visible, dispatch]);

  if (!club) {
    return null;
  }

  const handleQuit = async (clubId, userId) => {
    setLoading(true); 
    try {
      await dispatch(leaveClub({ userId: userId, clubId: clubId }));
      setConfirmVisible(false); 
      onClose(); 
    } catch (error) {
      console.error("Error quitting club:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleCancelConfirm = () => {
    setConfirmVisible(false); 
    onClose();
  };

  return (
    <>
      <Modal
        title={club.name}
        visible={visible}
        onCancel={onClose}
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={imageSrc}
            alt="Club"
            style={{
              width: "70%",
              margin: "0 auto",
              objectFit: "cover",
              objectPosition: "center",
              maxHeight: "200px",
              marginTop: "48px",
              borderRadius: "25px",
              boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.5)",
            }}
          />
          <div style={{ textAlign: "left", marginLeft: "85px" }}>
            <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
              <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
              <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                {club.content}
              </span>
              <h3 style={{ fontSize: "18px", marginLeft: "5px" }}>
                Communication: {club.communication}
              </h3>
            </div>
            <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
              <span style={{ fontWeight: "bold" }}>Activities:</span>{" "}
              {club.activities.map(activity => (
                <div key={activity.id}>
                  <p>{activity.name}</p>
                  <p>{activity.place}</p>
                  <p>{activity.date}</p>
                  <p>{activity.content}</p>
                </div>
              ))}
            </div>
          
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="primary"
            style={{ backgroundColor: "red" }}
            onClick={() => setConfirmVisible(true)}
            loading={loading} 
          >
            Quit This Club
          </Button>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              type="primary"
              onClick={() => {navigate("/activitylist/"+club.id)}}
              loading={loading}
            >
              Go To This Club's Activities
            </Button>
          </div>
      </Modal>

      <Modal
        title="Quit Club"
        visible={confirmVisible}
        onCancel={handleCancelConfirm}
        onOk={() => handleQuit(club.id, localStorage.getItem("userId"))}
      >
        <p>Are you sure you want to quit this club?</p>
      </Modal>
    </>
  );
}

export default MyClubModal;
