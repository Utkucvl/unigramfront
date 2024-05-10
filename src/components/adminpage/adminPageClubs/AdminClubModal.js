import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getImageByIdClub } from '../../../store/imageSlice';

function AdminClubModal({ club, modalVisible, hideClubDetails }) {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (club && modalVisible) {
      const fetchImage = async () => {
        const result = await dispatch(getImageByIdClub(club));
        setImageSrc(result.payload.base64Image);
      };

      fetchImage();
    }
  }, [club, modalVisible, dispatch]);

  if (!club) {
    return null;
  }

  return (
    <Modal
      title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Club Details</div>}
      visible={modalVisible}  // Ensure this uses the correct prop
      onCancel={hideClubDetails}
      footer={[
        <Button key="cancel" onClick={hideClubDetails}>
          Close
        </Button>
      ]}
    >
      <div style={{ textAlign: 'center' }}>
        <p><strong>ID:</strong> {club.id}</p>
        <p><strong>Name:</strong> {club.name}</p>
        <p><strong>Content:</strong> {club.content}</p>
        <p><strong>Communication:</strong> {club.communication}</p>
        {imageSrc && (
          <div>
            <img src={imageSrc} alt="Club" style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 10 }} />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default AdminClubModal;
