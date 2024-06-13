import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch } from "react-redux";
import { getImageByIdActivity } from "../../store/imageSlice";

function MyPastActivityModal({ myPastActivity, visible, onClose }) {
  const [imageSrc, setImageSrc] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (myPastActivity && visible) {
      const fetchImage = async () => {
        const result = await dispatch(getImageByIdActivity({ id: myPastActivity.id }));
        if (result.payload && result.payload.base64Image) {
          setImageSrc(result.payload.base64Image);
        }
      };

      fetchImage();
    }
  }, [myPastActivity, visible, dispatch]);

  if (!myPastActivity) {
    return null;
  }

  return (
    <Modal
      title={myPastActivity.title}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={imageSrc} alt="Activity"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <div style={{ textAlign: "left", marginLeft: "85px" }}>
          <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Activity Name:</span>{" "}
            <span style={{ fontSize: "18px", marginLeft: "5px" }}>
              {myPastActivity.name}
            </span>
          </div>
          <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Content:</span>{" "}
            <span style={{ fontSize: "18px", marginLeft: "5px" }}>
              {myPastActivity.content}
            </span>
          </div>
          <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Place Of Activity:</span>{" "}
            <span style={{ fontSize: "18px", marginLeft: "5px" }}>
              {myPastActivity.place}
            </span>
          </div>
          <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Date Of Activity:</span>{" "}
            <span style={{ fontSize: "18px", marginLeft: "5px" }}>
              {String(myPastActivity.date)}
            </span>
          </div>
          <div style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}>
            <span style={{ fontWeight: "bold" }}>Organizer Club:</span>{" "}
            <span style={{ fontSize: "18px", marginLeft: "5px" }}>
              {myPastActivity.clubName}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MyPastActivityModal;
