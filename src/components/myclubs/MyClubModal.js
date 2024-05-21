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
  const navigate = useNavigate();

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
        visible={visible}
        onCancel={onClose}
        footer={null}
        style={{ textAlign: "center" }}
      >
        <img
          src={imageSrc}
          alt="Club"
          style={{ maxWidth: "90%", height: "auto", marginTop: "20px" }}
        />
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <p><strong>Club Name:</strong> {club.name}</p>
          <p><strong>Description:</strong> {club.content}</p>
          <p><strong>Communication:</strong> {club.communication}</p>
        </div>
        <Button
          type="primary"
          style={{ marginTop: "20px", backgroundColor: "red", width: "75%" }}
          onClick={() => setConfirmVisible(true)}
          loading={loading}
        >
          Quit This Club
        </Button>
        <Button
          type="primary"
          style={{ marginTop: "10px", width: "75%" }}
          onClick={() => navigate("/activitylist/" + club.id)}
          loading={loading}
        >
          Go To This Club's Activities
        </Button>
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
