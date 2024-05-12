import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Space, Modal, Input, Form } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  InfoCircleOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import {
  getClubs,
  deleteClub,
  updateClub,
  createClub
} from "../../../store/clubSlice";
import { getUsers } from "../../../store/userSlice";
import AdminClubForm from "./AdminClubForm";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useNavigate } from "react-router-dom";
import AdminClubModal from "./AdminClubModal";


const AdminClubs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clubs = useSelector((state) => state.club.clubs);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedClubDetails, setSelectedClubDetails] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getClubs());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedClub && modalVisible) {
      const formattedClubs = {
        ...selectedClub,
      };
      form.setFieldsValue(formattedClubs);
    }
  }, [selectedClub, modalVisible, form]);

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Warning!",
      content: "Are you sure you want to delete this club?",
      okText: "Yes",
      cancelText: "No",
      async onOk() {
        try {
          console.log("Deleting club with ID:", id);
          await dispatch(deleteClub(id));
          console.log("Club deleted successfully");
          alertify.success("Club deleted");
          dispatch(getClubs());
        } catch (error) {
          console.error("Error deleting club:", error);
          alertify.error("Failed to delete Club");
        }
      },
      onCancel() {
        console.log("Delete cancelled");
        alertify.warning("Delete cancelled");
      },
    });
  };

  const handleModalOpen = (club = null) => {
    setSelectedClub(club);
    setIsUpdateMode(club !== null);
    setModalVisible(true);

    if (club) {
      console.log('Club ID:', club.id);
      form.setFieldsValue({
        ...club,
      });
    } else {
      form.resetFields();
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedClub(null); 
    dispatch(getClubs());
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        id: selectedClub?.id,
        activities: isUpdateMode ? selectedClub.activities : []
      };
      console.log(payload.id)
      const action = isUpdateMode ? updateClub : createClub;
      const response = await dispatch(action(payload));
      console.log('Payload:', payload);
      console.log('Response:', response);

      alertify.success(
        isUpdateMode ? "Club updated successfully" : "Club added successfully"
      );
      if (!isUpdateMode) {
        navigate(`/uploadImageClub/${response.payload.id}`);
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      alertify.error("Failed to process the request");
    } finally {
      dispatch(getClubs());
      handleModalClose();
    }
  };


  const showClubDetails = (club) => {
    console.log('Showing details for club:', club);
    setSelectedClubDetails(club);
    setDetailModalVisible(true);
  };

  const hideClubDetails = () => {
    console.log('Hiding club details');
    setSelectedClubDetails(null);
    setDetailModalVisible(false);
  };


  const filteredActivities = searchText
    ? clubs.filter(
      (club) =>
        club.name.toLowerCase().includes(searchText.toLowerCase()) ||
        club.place.toLowerCase().includes(searchText.toLowerCase()) ||
        club.id.toString().startsWith(searchText)
    )
    : clubs;

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
          placeholder="Search clubs by name, place, or club ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 900 }}
        />
        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          onClick={() => handleModalOpen()}
        >
          Add New Club
        </Button>
      </div>

      <Table dataSource={filteredActivities} rowKey="id">
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Content" dataIndex="content" key="content" />


        <Table.Column
          title="Actions"
          key="clubs"
          render={(text, club) => (
            <Space size="middle">
              <Button
                icon={<EditOutlined />}
                onClick={() => handleModalOpen(club)}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(club.id)}
              />
              <Button
                icon={<InfoCircleOutlined />}
                onClick={() => showClubDetails(club)}
              />
              <Button
                icon={<DesktopOutlined />}
                onClick={() =>{navigate("/adminactivity/"+club.id)}}
              />
            </Space>
          )}
        />
      </Table>

      <Modal
        title={isUpdateMode ? "Update Club" : "Add New Club"}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={handleModalClose}
        okText={isUpdateMode ? "Update" : "Add"}
        cancelText="Cancel"
      >
        <AdminClubForm
          form={form}
          clubs={clubs}
          isUpdateMode={isUpdateMode}
          selectedClub={selectedClub}
        />
      </Modal>

      <AdminClubModal
        club={selectedClubDetails}
        modalVisible={detailModalVisible}
        hideClubDetails={hideClubDetails}
      />
    </div>
  );
};
export default AdminClubs;
