import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input } from 'antd';
import { getMyActivities, getMyPastActivities } from '../../store/myActivitySlice';
import MyPastActivityModal from './MyPastActivityModal';
import { getImageByIdActivity } from "../../store/imageSlice";


function MyPastActivity() {
  const dispatch = useDispatch();
  const myPastActivities = useSelector(state => state.myActivity.myPastActivities);
  const isAuthenticated = useSelector((state) => state.security.isAuthenticated);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMyActivity, setSelectedMyActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimini saklamak için state
  const [imageSources, setImageSources] = useState({}); // New state to hold image sources


  useEffect(() => {
    dispatch(getMyPastActivities());
  }, [dispatch]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const sources = {};
        await Promise.all(myPastActivities.map(async (activity) => {
          const result = await dispatch(getImageByIdActivity(activity));
          sources[activity.id] = result.payload.base64Image;
        }));
        setImageSources(sources);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [dispatch, myPastActivities]);


  useEffect(() => {
    dispatch(getMyPastActivities({ userId: localStorage.getItem("userId") }));
    console.log(myPastActivities)
  }, [dispatch]);

  const handleActivityClick = (myActivity) => {
    setSelectedMyActivity(myActivity);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    dispatch(getMyActivities({ userId: localStorage.getItem("userId") }));
  };


  return (
    <div className="dışDiv" style={{ display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center', height: "100vh", backgroundColor : "#f5f5f5" }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {myPastActivities.map((activity) => (
            <Card
              key={activity.id}
              hoverable
              style={{ width: 240, height: 360, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: "10" }}
              cover={<img alt="announcement" src={imageSources[activity.id]} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />}
              onClick={() => handleActivityClick(activity)}
            >
              <div style={{ padding: '' }}>
                <Card.Meta title={activity.name} style={{ marginBottom: '' }} />
                <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
                  {activity.content}
                </p>
                <span style={{ color: '#b6b7b8', marginBottom: "10px" }}>{String(activity.date)}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      <MyPastActivityModal
        myPastActivity={selectedMyActivity}
        visible={modalVisible && isAuthenticated}
        onClose={() => closeModal()}
      />
    </div>
  );
}

export default MyPastActivity;
