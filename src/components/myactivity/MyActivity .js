import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input } from 'antd';
import MyActivityModal from './MyActivityModal';
import { useCookies } from 'react-cookie';
import { getMyActivities } from '../../store/myActivitySlice'; 

function MyActivity() {
  const dispatch = useDispatch();
  const myActivities = useSelector(state => state.myActivity.myActivities);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMyActivity, setSelectedMyActivity] = useState(null);

  useEffect(() => {
    dispatch(getMyActivities());
  }, [dispatch]);

  const handleMyActivityClick = (myActivity) => {
    setSelectedMyActivity(myActivity);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div style={{ padding: '20px', alignItems: 'center' }}>
      {/* Implement search and filter if needed */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {myActivities.map((myActivity) => (
          <Card
            key={myActivity.id}
            hoverable
            style={{ margin: '10px' }}
            onClick={() => handleMyActivityClick(myActivity)}
          >
            <Card.Meta title={myActivity.name} />
          </Card>
        ))}
      </div>

      <MyActivityModal
        myActivity={selectedMyActivity}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}

export default MyActivity;
