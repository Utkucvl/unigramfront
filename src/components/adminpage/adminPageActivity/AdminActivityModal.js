import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { getImageByIdActivity} from '../../../store/imageSlice';

const AdminActivityModal = ({ selectedActivityDetails, clubs, visible, onClose }) => {
    const dispatch = useDispatch();
    const [imageSrc, setImageSrc] = useState('');

    // Fetch the image when selectedActivityDetails or modal visibility changes
    useEffect(() => {
        if (selectedActivityDetails && visible) {
            const fetchImage = async () => {
                const result = await dispatch(getImageByIdActivity({ id: selectedActivityDetails.id }));
                if (result.payload && result.payload.base64Image) {
                    setImageSrc(result.payload.base64Image);
                }
            };

            fetchImage();
        }
    }, [selectedActivityDetails, visible, dispatch]);

    if (!selectedActivityDetails) {
        return null; // Render nothing if no details are provided
    }

    return (
        <Modal
            title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Activity Details</div>}
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <div style={{ textAlign: 'center' }}>
                <p><strong>Name:</strong> {selectedActivityDetails.name}</p>
                <p><strong>Content:</strong> {selectedActivityDetails.content}</p>
                <p><strong>Place:</strong> {selectedActivityDetails.place}</p>
                <p><strong>Date:</strong> {selectedActivityDetails.date}</p>
                <p><strong>Club:</strong> {selectedActivityDetails.clubid ? clubs.find(club => club.id === selectedActivityDetails.clubid)?.name : 'Unknown'}</p>
                {imageSrc && (
                    <div>
                        <img src={imageSrc} alt="Activity" style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 10 }} />
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default AdminActivityModal;
