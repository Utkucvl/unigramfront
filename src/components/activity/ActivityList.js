import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "alertifyjs/build/css/alertify.css";
import { useCookies } from "react-cookie";
import { getActivities } from "../../store/activitySlice";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import ActivityModal from "./ActivityModal";

function ActivityList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Activities = useSelector((state) => state.activity.activities);
  const isAuthenticated = useSelector((state) => state.security.isAuthenticated);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    if (isAuthenticated) {
      setModalVisible(true);
    } else {
      navigate("/signin");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          fontWeight: "normal",
          color: "white",
          lineHeight: "1.2",
          position: "relative",
          zIndex: "2",
          fontFamily: "italic",
        }}
      >
        <div
          style={{
            marginBottom: "50px",
            height: "160px",
            backgroundImage:
              "url('http://www.agu.edu.tr/site/tpl/microsites/agu/images/kampus-parallax.jpg')",
            backgroundPosition: "center center",
            borderRadius: "25px",
            backgroundRepeat: "no-repeat",
            zIndex: "1",
            position: "relative",
            boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h2
              style={{
                fontSize: "48px",
                marginRight: "130vh",
                fontWeight: "lighter",
              }}
            >
              Activities
            </h2>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Activities.map((activity, index) => (
          <div
            key={activity.id}
            style={{ marginBottom: "35px", marginLeft: "100px" }}
          >
            <Card
              hoverable
              style={{
                width: "240px",
                height: "320px",
                marginRight: "25px",
                border: "2px solid #612c4d",
              }}
              onClick={() => handleActivityClick(activity)}
            >
              <div style={{ textAlign: "center" }}>
                <img
                  alt="example"
                  src={activity.photoUrl}
                  style={{
                    width: "40%",
                    height: "40%",
                    objectFit: "scale-down",
                    marginBottom: "15px",
                  }}
                />
              </div>
              <hr style={{ width: "100%", borderTop: "1px solid #612c4d" }} />
              <Meta title={activity.name} description={activity.content} />
              <span
                style={{
                  position: "absolute",
                  bottom: "15px",
                  left: "15px",
                  color: "#b6b7b8",
                }}
              >
                {String(activity.date)}
              </span>
            </Card>
          </div>
        ))}
      </div>
      <ActivityModal
        activity={selectedActivity}
        visible={modalVisible}
        onClose={closeModal}
      ></ActivityModal>
    </div>
  );
}

export default ActivityList;
