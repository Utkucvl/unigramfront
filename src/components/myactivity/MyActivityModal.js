import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from "react-redux";
import { quitActivity } from '../../store/myActivitySlice';
import { getImageByIdActivity } from "../../store/imageSlice";

function MyActivityModal({ myActivity, visible, onClose }) {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (myActivity && visible) {
      const fetchImage = async () => {
        const result = await dispatch(getImageByIdActivity({ id: myActivity.id }));
        if (result.payload && result.payload.base64Image) {
          setImageSrc(result.payload.base64Image);
        }
      };

      fetchImage();
    }
  }, [myActivity, visible, dispatch]);

  if (!myActivity) {
    return null;
  }

  const handleQuit = async (activityId, userId) => {
    setLoading(true); 
    try {
      await dispatch(quitActivity({ userId: userId, activityId: activityId }));
      setConfirmVisible(false); 
      onClose(); 
    } catch (error) {
      console.error("Error quitting activity:", error);
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
        title={myActivity.title}
        visible={visible}
        onCancel={onClose}
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={imageSrc}
            alt="Activity"
            style={{ maxWidth: "100%", height: "auto" }}
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
            style={{ backgroundColor: "red" }}
            onClick={() => setConfirmVisible(true)}
            loading={loading} 
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
