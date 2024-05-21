import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import { joinClub, leaveClub } from "../../store/myClubSlice";
import { getImageByIdClub } from "../../store/imageSlice";
import { useNavigate } from "react-router-dom";

function ClubModal({ club, visible, onClose, isJoined }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

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

  const handleJoin = async (clubId, userId) => {
    setLoading(true);
    try {
      await dispatch(joinClub({ userId: userId, clubId: clubId }));
      setConfirmVisible(false);
      onClose();
    } catch (error) {
      console.error("Error joining club:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeave = async (clubId, userId) => {
    setLoading(true);
    try {
      await dispatch(leaveClub({ userId: userId, clubId: clubId }));
      setConfirmVisible(false);
      onClose();
    } catch (error) {
      console.error("Error leaving club:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onClose}
        footer={null}
        style={{ textAlign: "center" }} 
      >
        <img src={imageSrc} alt="Club" style={{ maxWidth: "90%", height: "auto", marginTop: "20px" }} />
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
           <p><strong>Club Name:</strong> {club.name}</p>
           <p><strong>Description:</strong> {club.content}</p>
          <p><strong>Communication:</strong> {club.communication}</p>
        </div>
        <div style={{ marginTop: "20px" }}>
          {isJoined ? (
            <Button
              type="primary"
              onClick={() => handleLeave(club.id, localStorage.getItem("userId"))}
              loading={loading}
              style={{ width: "75%" }}
            >
              Leave This Club
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => setConfirmVisible(true)}
              loading={loading}
              style={{ width: "75%" }}
            >
              Join This Club
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => navigate("/activitylist/" + club.id)}
            loading={loading}
            style={{ width: "75%", marginTop: "10px",  }} 
          >
            Go To This Club's Activities
          </Button>
        </div>
      </Modal>

      <Modal
        title="Join Club"
        visible={confirmVisible}
        onCancel={() => setConfirmVisible(false)}
        onOk={() => handleJoin(club.id, localStorage.getItem("userId"))}
      >
        <p>Are you sure you want to join this club?</p>
      </Modal>
    </>
  );
}

export default ClubModal;
