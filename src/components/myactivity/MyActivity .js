import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input } from 'antd';
import MyActivityModal from './MyActivityModal';
import { useCookies } from 'react-cookie';
import { getMyActivities } from '../../store/myActivitySlice';

function MyActivity() {
  const dispatch = useDispatch();
  const myActivities = useSelector(state => state.myActivity.myActivities);
  const isAuthenticated = useSelector((state) => state.security.isAuthenticated);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMyActivity, setSelectedMyActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimini saklamak için state

  useEffect(() => {
    dispatch(getMyActivities({ userId: localStorage.getItem("userId") }));
    console.log(myActivities)
  }, [dispatch, myActivities]);

  const handleActivityClick = (myActivity) => {
    setSelectedMyActivity(myActivity);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <div className="dışDiv" style={{ display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center', height: "100vh", backgroundColor : "#f5f5f5" }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {myActivities.map((activity) => (
            <Card
              key={activity.id}
              hoverable
              style={{ width: 240, height: 360, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: "10" }}
              cover={<img alt="announcement" src={activity.photoUrl} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />}
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
      <MyActivityModal
        myActivity={selectedMyActivity}
        visible={modalVisible && isAuthenticated}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}

export default MyActivity;
