import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Card, Input } from "antd";
import Meta from "antd/es/card/Meta";
import ActivityModal from "./ActivityModal";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "alertifyjs/build/css/alertify.css";
import { useCookies } from "react-cookie";
import { getActivities } from "../../store/activitySlice";
import { getMyActivities } from "../../store/myActivitySlice";
import { getImageByIdActivity } from "../../store/imageSlice";

function ActivityList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Activities = useSelector((state) => state.activity.activities);
  const myActivities = useSelector((state) => state.myActivity.myActivities);
  const isAuthenticated = useSelector(
    (state) => state.security.isAuthenticated
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageSources, setImageSources] = useState({});

  useEffect(() => {
    dispatch(getActivities());
    dispatch(getMyActivities({ userId: localStorage.getItem("userId") }));
  }, [dispatch]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const sources = {};
        await Promise.all(Activities.map(async (activity) => {
          const result = await dispatch(getImageByIdActivity(activity));
          sources[activity.id] = result.payload.base64Image;
        }));
        setImageSources(sources);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [dispatch, Activities]);


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
    dispatch(getActivities());
    dispatch(getMyActivities({ userId: localStorage.getItem("userId") }));
  };

  // Aktiviteleri aramak için bir filtre fonksiyonu
  const filteredActivities = Activities.filter((activity) =>
    activity.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="dışDiv"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        height: "100vh",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          alignSelf: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Input
          placeholder="Search an Event..."
          placeholderTextColor="black"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {filteredActivities.map((activity) => {
            const isJoined = myActivities.find(
              (myActivity) => myActivity.id === activity.id
            );
            return (
              <Card
                key={activity.id}
                hoverable
                style={{
                  width: 240,
                  height: 400,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10",
                }}
                cover={
                  <img
                    alt="Activity"
                    src={imageSources[activity.id]}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />
                }
                onClick={() => handleActivityClick(activity)}
              >
                <div style={{ padding: "" }}>
                  <Meta
                    title={activity.name}
                    description={<span style={{ fontWeight: "bold" }}>{activity.clubName}</span>} 
                    style={{ marginBottom: "" }}
                  />
                  <p
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "3",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {activity.content}
                  </p>
                  <span style={{ color: "#b6b7b8", marginBottom: "10px" }}>
                    {String(activity.date)}
                  </span>
                  <div
                    style={{
                      color: isJoined ? "blue" : "red",
                      fontSize: "18px",
                    }}
                  >
                    {isJoined ? (
                      <>
                        <CheckOutlined />
                        <span>Joined</span>
                      </>
                    ) : (
                      <>
                        <CloseOutlined />
                        <span>Unjoined</span>
                      </>
                    )}
                  </div>
                </div>
              </Card>

            );
          })}
        </div>
      </div>

      {selectedActivity && (
        <ActivityModal
          activity={selectedActivity}
          isJoined={myActivities.find(
            (myActivity) => myActivity.id === selectedActivity.id
          )}
          visible={modalVisible && isAuthenticated}
          onClose={() => closeModal()} // Added closing parenthesis after closeModal
        />
      )}
    </div>
  );
}

export default ActivityList;
