import React, { useEffect,useState } from "react";
import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import { joinActivity } from "../../store/myActivitySlice";
import { getImageByIdActivity } from "../../store/imageSlice";

function ActivityModal({ activity, visible, onClose, isJoined }) {
  const dispatch = useDispatch();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the button
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
    return null; // Render the modal if activity is not null
  }

  // Function to handle joining the activity
  const handleJoin = async (activityId, userId) => {
    setLoading(true); // Set loading to true when the button is clicked
    try {
      await dispatch(joinActivity({ userId: userId, activityId: activityId }));
      setConfirmVisible(false); // Close the confirmation pop-up
      onClose(); // Close the main modal
    } catch (error) {
      console.error("Error joining activity:", error);
    } finally {
      setLoading(false); // Reset loading to false after the request completes
    }
  };

  return (
    <>
      <Modal
        title={activity.title}
        visible={visible}
        onCancel={onClose}
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
        <img src={imageSrc} alt="Announcement" style={{ maxWidth: "100%", height: "auto", marginTop : "25px"}} />

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
        {/* Button to join the activity */}
        {!isJoined && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              type="primary"
              onClick={() => setConfirmVisible(true)}
              loading={loading} // Set loading state for the button
            >
              Join This Activity
            </Button>
          </div>
        )}
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        title="Join Activity"
        visible={confirmVisible}
        onCancel={() => setConfirmVisible(false)}
        onOk={() => handleJoin(activity.id, localStorage.getItem("userId"))}
      >
        <p>Are you sure you want to join this activity?</p>
      </Modal>
    </>
  );
}

export default ActivityModal;
