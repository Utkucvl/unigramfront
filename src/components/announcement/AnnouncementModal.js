import React from "react";
import { Modal } from "antd";

function AnnouncementModal({ announcement, visible, onClose }) {
  if (!announcement) {
    return null; // Eğer announcement null ise modalı render etme
  }

  return (
    <Modal
      title={announcement.title}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div style={{ textAlign: "center" }}>
        <img src={announcement.photoUrl} alt="Announcement" style={{ maxWidth: "100%", height: "auto" }} />
      </div>
      <p>{announcement.content}</p>
    </Modal>
  );
}

export default AnnouncementModal;
