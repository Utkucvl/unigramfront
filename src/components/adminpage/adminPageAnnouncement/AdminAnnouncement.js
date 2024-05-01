import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Space, Modal, Input ,Form} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  getAnnouncements,
  deleteAnnouncement,
  updateAnnouncement,
  saveAnnouncement,
} from "../../../store/announcementSlice";
import alertify from "alertifyjs";
import AdminAnnouncementModal from "./AdminAnnouncementModal"; 
import AnnouncementForm from "./AdminAnnouncementForm"; 

import "alertifyjs/build/css/alertify.css";
import moment from "moment";

function AdminAnnouncements() {
  const dispatch = useDispatch();
  const announcements = useSelector(
    (state) => state.announcement.announcements
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [selectedAnnouncementDetails, setSelectedAnnouncementDetails] =
    useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Warning!",
      content: "Are you sure you want to delete this announcement?",
      okText: "Yes",
      cancelText: "No",
      async onOk() {
        await dispatch(deleteAnnouncement({ id }));
        alertify.success("Announcement deleted");
        dispatch(getAnnouncements());
      },
      onCancel() {
        alertify.error("Delete cancelled");
      },
    });
  };

  const handleModalOpen = (announcement = null) => {
    form.resetFields();
    if (announcement) {
      form.setFieldsValue({
        title: announcement.title,
        content: announcement.content,
        announcementDate: announcement.date,
        photoUrl: announcement.photoUrl,
      });
      setIsUpdateMode(true);
      setSelectedAnnouncement(announcement);
    } else {
      setIsUpdateMode(false);
      setSelectedAnnouncement(null);
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (isUpdateMode && selectedAnnouncement) {
        await dispatch(updateAnnouncement({ ...selectedAnnouncement, ...values }));
        alertify.success("Announcement updated successfully");
      } else {
        values.announcementDate=moment()
        await dispatch(saveAnnouncement(values));
        alertify.success("Announcement added successfully");
      }
      dispatch(getAnnouncements());
      handleModalClose();
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      alertify.error("Failed to submit the form. Check your input.");
    }
  };

  const showAnnouncementDetails = (announcement) => {
    setSelectedAnnouncementDetails(announcement);
    setDetailModalVisible(true);
  };

  const hideAnnouncementDetails = () => {
    setSelectedAnnouncementDetails(null);
    setDetailModalVisible(false);
  };

  const filteredAnnouncements = searchText
    ? announcements.filter(
        (a) =>
          a.title.toLowerCase().includes(searchText.toLowerCase()) ||
          a.id.toString().startsWith(searchText)
      )
    : announcements;

  return (
    <div className="admin-announcements-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          marginTop: 10,
          padding: 10,
        }}
      >
        <Input
          placeholder="Search announcements by title or ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 900 }}
        />
        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          onClick={() => handleModalOpen()}
          style={{ marginLeft: "auto" }}
        >
          Add Announcement
        </Button>
      </div>

      <div className="table-container">
        <Table
          dataSource={filteredAnnouncements}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        >
          <Table.Column title="ID" dataIndex="id" key="id" />
          <Table.Column title="Title" dataIndex="title" key="title" />
          <Table.Column title="Content" dataIndex="content" key="content" />
          <Table.Column title="Date" dataIndex="announcementDate" key="date" />
          <Table.Column
            title="Actions"
            key="actions"
            render={(text, announcement) => (
              <Space size="middle">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleModalOpen(announcement)}
                />
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(announcement.id)}
                />
                <Button
                  icon={<InfoCircleOutlined />}
                  onClick={() => showAnnouncementDetails(announcement)}
                />
              </Space>
            )}
          />
        </Table>
      </div>

      <Modal
        title={isUpdateMode ? "Update Announcement" : "Add New Announcement"}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={handleModalClose}
        okText={isUpdateMode ? "Update" : "Add"}
        cancelText="Cancel"
      >
        <AnnouncementForm
          form={form}
          selectedAnnouncement={selectedAnnouncement}
        />
      </Modal>

      <AdminAnnouncementModal
        announcement={selectedAnnouncementDetails}
        detailModalVisible={detailModalVisible}
        hideAnnouncementDetails={hideAnnouncementDetails}
      />
    </div>
  );
}

export default AdminAnnouncements;
