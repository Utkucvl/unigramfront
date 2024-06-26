import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "antd";
import { getImageByIdActivity } from "../../store/imageSlice";

function PastActivityModal({ activity, visible, onClose }) {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState('');
  
  useEffect(() => {
    if (activity && visible) {
      const fetchImage = async () => {
        const result = await dispatch(getImageByIdActivity({ id: activity.id }));
        if (result.payload && result.payload.base64Image) {
          setImageSrc(result.payload.base64Image);
        }
      };

      fetchImage();
    }
  }, [activity, visible, dispatch]);
  if (!activity) {
    return null; // Eğer announcement null ise modalı render etme
  }

  return (
    <Modal
      title={activity.title}
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
          <div
            style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}
          >
            <span style={{ fontWeight: "bold" }}>Activity Name:</span>{" "}
            <span style={{ fontSize: "18px", marginLeft: "5px" }}>
              {activity.name}
            </span>
          </div>
          <div
            style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}
          >
            <span style={{ fontWeight: "bold" }}>Content:</span>{" "}
            <span style={{ fontSize: "18px", marginLeft: "5px" }}>
              {activity.content}
            </span>
          </div>
          <div
            style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}
          >
            <span style={{ fontWeight: "bold" }}>Place Of Activity:</span>{" "}
            <span style={{ fontSize: "18px", marginLeft: "5px" }}>
              {activity.place}
            </span>
          </div>
          <div
            style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}
          >
            <span style={{ fontWeight: "bold" }}>Date Of Activity:</span>{" "}
            <span style={{ fontSize: "18px", marginLeft: "5px" }}>
              {String(activity.date)}
            </span>
          </div>
          <div
            style={{ margin: "20px", fontFamily: "italic", fontSize: "18px" }}
          >
            <span style={{ fontWeight: "bold" }}>Organizer Club:</span>{" "}
            <span style={{ fontSize: "18px", marginLeft: "5px" }}>
              {activity.clubName}
            </span>
          </div>

        </div>
      </div>
    </Modal>
  );
}

export default PastActivityModal;
