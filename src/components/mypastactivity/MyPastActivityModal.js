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
    </>
  );
}

export default MyPastActivityModal;
