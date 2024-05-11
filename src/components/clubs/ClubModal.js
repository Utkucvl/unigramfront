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
      >
        <div style={{ textAlign: "center" }}>
          <img src={imageSrc} alt="Club" style={{ maxWidth: "100%", height: "auto", marginTop : "25px"}} />

          <div style={{ textAlign: "left", marginLeft: "85px" }}>
            <div
              style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}
            >
              <span style={{ fontWeight: "bold" }}>Club Name:</span>{" "}
              <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                {club.name}
              </span>
            </div>
            <div
              style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}
            >
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
        {isJoined ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              type="primary"
              onClick={() => handleLeave(club.id, localStorage.getItem("userId"))}
              loading={loading}
            >
              Leave This Club
            </Button>
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              type="primary"
              onClick={() => setConfirmVisible(true)}
              loading={loading}
            >
              Join This Club
            </Button>
          </div>
        )}
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
