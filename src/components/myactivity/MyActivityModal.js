import React from 'react';
import { Modal } from 'antd';

function MyActivityModal({ myActivity, visible, onClose }) {
  if (!myActivity) {
    return null;
  }

  return (
    <Modal
      title={myActivity.title}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div style={{ textAlign: 'center' }}>
        <img
          src={myActivity.photoUrl}
          alt="My Activity"
          style={{
            width: '70%',
            margin: '0 auto',
            objectFit: 'cover',
            objectPosition: 'center',
            maxHeight: '200px',
            marginTop: '48px',
            borderRadius: '25px',
            boxShadow: '0px 16px 40px rgba(0, 0, 0, 0.5)',
          }}
        />
        <div style={{ textAlign: 'left', marginLeft: '85px' }}>
         
          <div style={{ margin: '20px', fontFamily: 'italic', fontSize: '18px' }}>
            <span style={{ fontWeight: 'bold' }}>Description:</span>
            <span style={{ fontSize: '18px', marginLeft: '5px' }}>
              {myActivity.description}
            </span>
          </div>
         
        </div>
      </div>
    </Modal>
  );
}

export default MyActivityModal;
