import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from "react-redux";
import { quitActivity } from '../../store/myActivitySlice';

function MyPastActivityModal({ myPastActivity, visible, onClose }) {

  if (!myPastActivity) {
    return null;
  }

  return (
    <>
      <Modal
        title={myPastActivity.title}
        visible={visible}
        onCancel={onClose}
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={myPastActivity.photoUrl}
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
    </>
  );
}

export default MyPastActivityModal;
