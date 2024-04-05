import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from "react-redux";
import { quitActivity } from '../../store/myActivitySlice';

function MyActivityModal({ myActivity, visible, onClose }) {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the button
  const dispatch = useDispatch();

  if (!myActivity) {
    return null;
  }

  const handleQuit = async (activityId, userId) => {
    setLoading(true); // Set loading to true when the button is clicked
    try {
      await dispatch(quitActivity({ userId: userId, activityId: activityId }));
      setConfirmVisible(false); // Close the confirmation pop-up
      onClose(); // Close the main modal
    } catch (error) {
      console.error("Error joining activity:", error);
    } finally {
      setLoading(false); // Reset loading to false after the request completes
    }
  };

  const handleCancelConfirm = () => {
    setConfirmVisible(false); // Close the confirmation modal
    onClose(); // Close the main modal
  };

  return (
    <>
      <Modal
        title={myActivity.title}
        visible={visible}
        onCancel={onClose}
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={myActivity.photoUrl}
            alt="Activity"
            style={{
              width: "70%",
              margin: "0 auto",
              objectFit: "cover", // Görüntüyü tamamen kaplayacak şekilde boyutlandırma
              objectPosition: "center", // Görüntüyü ortalamak için
              maxHeight: "200px", // Maksimum yükseklik 210 piksel olacak
              marginTop: "48px",
              borderRadius: "25px",
              boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.5)",
            }}
          />
          <div style={{ textAlign: "left", marginLeft: "85px" }}>
            <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
              <span style={{ fontWeight: "bold" }}>Activity Name:</span>{" "}
              <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                {myActivity.name}
              </span>
            </div>
            <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
              <span style={{ fontWeight: "bold" }}>Content:</span>{" "}
              <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                {myActivity.content}
              </span>
            </div>
            <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
              <span style={{ fontWeight: "bold" }}>Place Of Activity:</span>{" "}
              <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                {myActivity.place}
              </span>
            </div>
            <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
              <span style={{ fontWeight: "bold" }}>Date Of Activity:</span>{" "}
              <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                {String(myActivity.date)}
              </span>
            </div>
            <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
              <span style={{ fontWeight: "bold" }}>Organizer Club:</span>{" "}
              <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                {myActivity.clubName}
              </span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="primary"
            style={{backgroundColor:"red"}}
            onClick={() => setConfirmVisible(true)}
            loading={loading} // Set loading state for the button
          >
            Quit This Activity
          </Button>
        </div>
      </Modal>

      <Modal
        title="Quit Activity"
        visible={confirmVisible}
        onCancel={handleCancelConfirm}
        onOk={() => handleQuit(myActivity.id, localStorage.getItem("userId"))}
      >
        <p>Are you sure you want to quit this activity?</p>
      </Modal>
    </>
  );
}

export default MyActivityModal;
