import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Modal, Button } from 'antd';
import { getMyClubs } from '../../store/myClubSlice';
import { getImageByIdClub } from '../../store/imageSlice';
import MyClubModal from './MyClubModal';

function MyClub() {
  const dispatch = useDispatch();
  
  const myClubs = useSelector(state => state.myClub.myClubs || []);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [imageSources, setImageSources] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(getMyClubs({ userId }));
    } else {
      console.error("User ID not found in local storage.");
    }
  }, [dispatch]);

  useEffect(() => {
    if (myClubs.length > 0) {
      const fetchImages = async () => {
        try {
          const sources = {};
          for (const club of myClubs) {
            const response = await dispatch(getImageByIdClub({ id: club.id }));
            if (response.payload && response.payload.base64Image) {
              sources[club.id] = response.payload.base64Image;
            }
          }
          setImageSources(sources);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };
      fetchImages();
    }
  }, [dispatch, myClubs]);

  const handleClubClick = (club) => {
    setSelectedClub(club);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    dispatch(getMyClubs({ userId: localStorage.getItem("userId") }));

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center', height: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {myClubs.length > 0 ? myClubs.map((club) => (
          <Card
            key={club.id}
            hoverable
            style={{ width: 240, height: 360, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            cover={<img alt="club" src={imageSources[club.id] } style={{ width: '100%', height: '160px', objectFit: 'cover' }} />}
            onClick={() => handleClubClick(club)}
          >
            <div>
              <Card.Meta title={club.name} />
              <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
                {club.content}
              </p>
            </div>
          </Card>
        )) : <p>No clubs found or still loading...</p>}
      </div>
      {selectedClub && (
        <MyClubModal
          club={selectedClub}
          visible={modalVisible}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default MyClub;