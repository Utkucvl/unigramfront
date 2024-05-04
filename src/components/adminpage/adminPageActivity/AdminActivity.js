import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Space, Modal, Input, Form } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  getActivities,
  deleteActivity,
  updateActivity,
  saveActivity,
  changeActivity,
} from "../../../store/activitySlice";
import { getUsers } from "../../../store/userSlice";
import { getClubs } from "../../../store/clubSlice";
import moment from "moment";
import AdminActivityForm from "./AdminActivityForm";
import AdminActivityModal from "./AdminActivityModal"; // Detay modalını içeren bileşen
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

const AdminActivity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activities = useSelector((state) => state.activity.activities);
  const currentActivity = useSelector((state) => state.activity.currentActivity);
  const clubs = useSelector((state) => state.club.clubs);
  const users = useSelector((state) => state.user.users);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedActivityDetails, setSelectedActivityDetails] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getClubs());
    dispatch(getActivities());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedActivity && modalVisible) {
      const formattedActivity = {
        ...selectedActivity,
        date: selectedActivity.date ? moment(selectedActivity.date) : null,
      };
      form.setFieldsValue(formattedActivity);
    }
  }, [selectedActivity, modalVisible, form]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Warning!",
      content: "Are you sure you want to delete this activity?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        dispatch(deleteActivity({ id }));
        alertify.success("Activity deleted");
      },
      onCancel() {
        alertify.error("Delete cancelled");
      },
    });
  };
  const handleModalOpen = (activity = null) => {
    setSelectedActivity(activity);
    setIsUpdateMode(activity !== null);
    setModalVisible(true);
  
    if (activity) {
      form.setFieldsValue({
        ...activity,
        date: activity.date ? moment(activity.date) : null,
        clubId: activity.clubid,
      });
    } else {
      form.resetFields();
    }
  };
  

  const handleModalClose = () => {
    setModalVisible(false);
    dispatch(getActivities());
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (!values.date || !moment(values.date).isValid()) {
        alertify.error("Invalid date");
        return;
      }
  
      const payload = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        clubid: values.clubId,
      };
      delete payload.clubId;
  
      const action = isUpdateMode ? updateActivity : saveActivity;
      const response = await dispatch(action(payload));
      const newActivityId = response.payload.id; // Yeni etkinliğin ID'sini alıyoruz
      alertify.success(
        isUpdateMode
          ? "Activity updated successfully"
          : "Activity added successfully"
      );
      console.log(payload);
      navigate(`/uploadImageActivity/${newActivityId}`);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      alertify.error("Failed to process the request");
    } finally {
      dispatch(getActivities());
      handleModalClose();
    }
  };
  
  const showActivityDetails = (activity) => {
    setSelectedActivityDetails(activity);
    setDetailModalVisible(true);
  };

  const hideActivityDetails = () => {
    setSelectedActivityDetails(null);
    setDetailModalVisible(false);
  };
  const getUserNamesFromIds = (userIds) => {
    const userNames = [];
    userIds.forEach((userId) => {
      const user = users.find((user) => user.id === userId);
      if (user) {
        userNames.push(user.userName);
      }
    });
    console.log(userNames);
    return userNames;
  };
  const handleParticipantClick = (activity) => {
    const participantNames = getUserNamesFromIds(activity.usersId);
    Modal.info({
      content: (
        <div>
          {participantNames.length === 0 ? (
            <span></span>
          ) : (
            <strong>Participants:</strong>
          )}
          <p></p>
          <ul>
            {participantNames.length === 0 ? (
              <span>No Participant</span>
            ) : (
              participantNames.map((name, index) => <li key={index}>{name}</li>)
            )}
          </ul>
        </div>
      ),
      onOk() {},
    });
  };

  const filteredActivities = searchText
    ? activities.filter(
        (activity) =>
          activity.name.toLowerCase().includes(searchText.toLowerCase()) ||
          activity.place.toLowerCase().includes(searchText.toLowerCase()) ||
          activity.id.toString().startsWith(searchText)
      )
    : activities;

  return (
    <div>
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
          placeholder="Search activities by name, place, or activity ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 900 }}
        />
        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          onClick={() => handleModalOpen()}
        >
          Add New Activity
        </Button>
      </div>

      <Table dataSource={filteredActivities} rowKey="id">
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Content" dataIndex="content" key="content" />
        <Table.Column title="Date" dataIndex="date" key="date" />
        <Table.Column title="Place" dataIndex="place" key="place" />
        <Table.Column
          title="Club"
          dataIndex="clubid"
          key="clubid"
          render={(clubid) => {
            const club = clubs.find((club) => club.id === clubid);
            return club ? club.name : "Unknown";
          }}
        />
        <Table.Column
          title="Participants"
          dataIndex="usersId"
          key="participants"
          render={(usersId, activity) => (
            <span onClick={() => handleParticipantClick(activity)}>
              {activity.usersId.length}
            </span>
          )}
        />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, activity) => (
            <Space size="middle">
              <Button
                icon={<EditOutlined />}
                onClick={() => handleModalOpen(activity)}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(activity.id)}
              />
              <Button
                icon={<InfoCircleOutlined />}
                onClick={() => showActivityDetails(activity)}
              />
            </Space>
          )}
        />
      </Table>

      <Modal
        title={isUpdateMode ? "Update Activity" : "Add New Activity"}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={handleModalClose}
        okText={isUpdateMode ? "Update" : "Add"}
        cancelText="Cancel"
      >
        <AdminActivityForm
          form={form}
          clubs={clubs}
          isUpdateMode={isUpdateMode}
          selectedActivity={selectedActivity}
        />
      </Modal>

      <AdminActivityModal
        selectedActivityDetails={selectedActivityDetails}
        clubs={clubs}
        visible={detailModalVisible}
        onClose={hideActivityDetails}
      />
    </div>
  );
};

export default AdminActivity;
