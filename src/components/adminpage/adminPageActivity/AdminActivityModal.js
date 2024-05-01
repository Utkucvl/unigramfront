import React from 'react';
import { Modal } from 'antd';

const AdminActivityModal = ({ selectedActivityDetails, clubs, visible, onClose }) => {
    return (
        <Modal
            title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Activity Details</div>}
            visible={visible}
            footer={null}
            onCancel={onClose}
        >
            {selectedActivityDetails && (
                <div style={{ textAlign: 'center' }}>
                    <p><strong>Name:</strong>: {selectedActivityDetails.name}</p>
                    <p><strong>Content:</strong> {selectedActivityDetails.content}</p>
                    <p><strong>Place: </strong>{selectedActivityDetails.place}</p>
                    <p><strong>Date:</strong> {selectedActivityDetails.date}</p>
                    <p><strong>Club:</strong> {selectedActivityDetails.clubid ? clubs.find(club => club.id === selectedActivityDetails.clubid)?.name : 'Unknown'}</p>
                    {selectedActivityDetails.photoUrl && (
                        <div>
                            <img src={selectedActivityDetails.photoUrl} alt="Activity" style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 10 }} />
                        </div>
                    )}
                </div>
            )}
        </Modal>
    );
};

export default AdminActivityModal;
