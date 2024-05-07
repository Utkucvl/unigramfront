import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import './AnnouncementList.css';
import { useDispatch } from 'react-redux';
import { getImageByIdAnnouncement } from '../../store/imageSlice';

function AnnouncementModal({ announcement, visible, onClose }) {
    const dispatch = useDispatch();
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (announcement && visible) {
            const fetchImage = async () => {
                const result = await dispatch(getImageByIdAnnouncement(announcement));
                setImageSrc(result.payload.base64Image);
            };

            fetchImage();
        }
    }, [announcement, visible, dispatch]);

    if (!announcement) {
        return null;
    }

    return (
        <Modal
            title={announcement.title}
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <div style={{ textAlign: "center" }}>
                {imageSrc ? (
                    <img src={imageSrc} alt="Announcement" style={{ maxWidth: "100%", height: "auto" }} />
                ) : (
                    <p>Loading image...</p> 
                )}
            </div>
            <p>{announcement.content}</p>
        </Modal>
    );
}

export default AnnouncementModal;
