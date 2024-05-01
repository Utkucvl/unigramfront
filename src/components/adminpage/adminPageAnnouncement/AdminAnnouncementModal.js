import React from "react";
import { Modal } from "antd";

function AdminAnnouncementModal({ announcement, detailModalVisible, hideAnnouncementDetails }) {
  if (!announcement) {
    return null; // Eğer announcement null ise modalı render etme
  }
  const renderDetailModalContent = () => (
    <div style={{ textAlign: 'center' }}>
        <p><strong>Title:</strong> {announcement.title}</p>
        <p><strong>Content:</strong> {announcement.content}</p>
        <p><strong>Date:</strong> {announcement.announcementDate}</p>
        {announcement.photoUrl && (
            <div>
                <img src={announcement.photoUrl} alt="Announcement" style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 10 }} />
            </div>
        )}
    </div>
);

  return (
    <Modal
                title={
                    <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
                        Announcement Details
                    </div>
                }
                visible={detailModalVisible}
                onCancel={hideAnnouncementDetails}
                footer={null}
            >
                {announcement && renderDetailModalContent()}
            </Modal>
  );
}

export default AdminAnnouncementModal;
