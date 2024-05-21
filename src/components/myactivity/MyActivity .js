import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input } from 'antd';
import MyActivityModal from './MyActivityModal';
import { useCookies } from 'react-cookie';
import { getMyActivities } from '../../store/myActivitySlice';
import { getImageByIdActivity } from "../../store/imageSlice";

function MyActivity() {
  const dispatch = useDispatch();
  const myActivities = useSelector(state => state.myActivity.myActivities);
  const isAuthenticated = useSelector(state => state.security.isAuthenticated);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMyActivity, setSelectedMyActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageSources, setImageSources] = useState({});

  useEffect(() => {
    dispatch(getMyActivities({ userId: localStorage.getItem("userId") }));
  }, [dispatch]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const sources = {};
        await Promise.all(myActivities.map(async (activity) => {
          const result = await dispatch(getImageByIdActivity(activity));
          sources[activity.id] = result.payload.base64Image;
        }));
        setImageSources(sources);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [dispatch, myActivities]);

  const handleActivityClick = (myActivity) => {
    setSelectedMyActivity(myActivity);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    dispatch(getMyActivities({ userId: localStorage.getItem("userId") }));
  };

  const filteredMyActivities = myActivities.filter((activity) =>
    activity.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dışDiv" style={{ display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center', height: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{ marginBottom: "20px", marginTop: "", alignSelf: "center", textAlign: "center", width: "100%", maxWidth: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <Input placeholder="Search an Activity..." placeholderTextColor="black" style={{ width: "100%", padding: "12px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {filteredMyActivities.map((activity) => (
          <Card
            key={activity.id}
            hoverable
            style={{ width: 240, height: 360, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: "10" }}
            cover={<img alt="activity" src={imageSources[activity.id]} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />}
            onClick={() => handleActivityClick(activity)}
          >
            <div style={{ padding: '' }}>
              <Card.Meta title={activity.name}
                description={<span style={{ fontWeight: "bold" }}>{activity.clubName}</span>}
              />
              <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
                {activity.content}
              </p>
              <span style={{ color: '#b6b7b8', marginBottom: "10px" }}>{String(activity.date)}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <MyActivityModal
        myActivity={selectedMyActivity}
        visible={modalVisible && isAuthenticated}
        onClose={() => closeModal()}
      />
    </div>
  );
}

export default MyActivity;
