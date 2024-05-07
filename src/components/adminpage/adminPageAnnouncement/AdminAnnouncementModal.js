import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getImageByIdAnnouncement } from '../../../store/imageSlice';

function AdminAnnouncementModal({ announcement, detailModalVisible, hideAnnouncementDetails }) {
    const dispatch = useDispatch();
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (announcement && detailModalVisible) {
            const fetchImage = async () => {
                const result = await dispatch(getImageByIdAnnouncement(announcement));
                setImageSrc(result.payload.base64Image);
            };

            fetchImage();
        }
    }, [announcement, detailModalVisible, dispatch]);

    if (!announcement) {
        return null;
    }

    const renderDetailModalContent = () => (
        <div style={{ textAlign: 'center' }}>
            <p><strong>Title:</strong> {announcement.title}</p>
            <p><strong>Content:</strong> {announcement.content}</p>
            <p><strong>Date:</strong> {announcement.announcementDate}</p>
            {imageSrc && (
                <div>
                    <img src={imageSrc} alt="Announcement" style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 10 }} />
                </div>
            )}
        </div>
    );

    return (
        <Modal
            title={<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Announcement Details</div>}
            visible={detailModalVisible}
            onCancel={hideAnnouncementDetails}
            footer={null}
        >
            {renderDetailModalContent()}
        </Modal>
    );
}

export default AdminAnnouncementModal;
