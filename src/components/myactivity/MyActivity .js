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
    dispatch(getMyActivities({userId:localStorage.getItem("userId")}));
    console.log(myActivities)
  }, [dispatch,myActivities]);

  const handleActivityClick = (myActivity) => {
    setSelectedMyActivity(myActivity);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
 

  return (
    <div className="dışDiv" style={{ display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center' }}>
    {/* Aktivitelerin listelendiği bölüm */}
  

    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {myActivities.map((activity) => (
          <Card
            key={activity.id}
            hoverable
            style={{
              width: 250,
              height: 360,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onClick={() => handleActivityClick(activity)}
          >
            <div style={{ height: '160px', overflow: 'hidden' }}>
              <img alt="activity" src={activity.photoUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '10px' }}>
              <Card.Meta title={activity.name} style={{ marginBottom: '10px' }} />
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
                <div>{activity.content}</div>
              </div>
              <div style={{ textAlign: 'right', marginTop: '10px' }}>

                <span style={{ color: '#b6b7b8' }}>{String(activity.date)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>{/* İçerik */}</div>
              </div>


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
