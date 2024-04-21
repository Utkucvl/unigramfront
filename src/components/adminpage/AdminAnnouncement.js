import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Space, Modal, Form, Input } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { getAnnouncements, deleteAnnouncement, updateAnnouncement, saveAnnouncement } from '../../store/announcementSlice';
import alertify from 'alertifyjs';
import { DatePicker } from 'antd';

import 'alertifyjs/build/css/alertify.css';

function AdminAnnouncements() {
    const dispatch = useDispatch();
    const announcements = useSelector(state => state.announcement.announcements);
    const [modalVisible, setModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [selectedAnnouncementDetails, setSelectedAnnouncementDetails] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(getAnnouncements());
    }, [dispatch]);
    const handleDelete = id => {
        Modal.confirm({
            title: "Warning!",
            content: "Are you sure you want to delete this announcement?",
            okText: "Yes",
            cancelText: "No",
            onOk() {
                dispatch(deleteAnnouncement({ id })).then(() => {
                    alertify.success('Announcement deleted');
                    dispatch(getAnnouncements()); 
                });
            },
            onCancel() {
                alertify.error('Delete cancelled');
            }
        });
    };
    

    const handleModalOpen = (announcement = null) => {
        form.resetFields();
        if (announcement) {
            form.setFieldsValue({
                title: announcement.title,
                content: announcement.content,
                announcementDate: announcement.date,
                photoUrl: announcement.photoUrl
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
                alertify.success('Announcement updated successfully');
                dispatch(getAnnouncements());
            } else {
                await dispatch(saveAnnouncement(values));
                alertify.success('Announcement added successfully');
                dispatch(getAnnouncements());
            }
            handleModalClose();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            alertify.error('Failed to submit the form. Check your input.');
        }
    };

    const showAnnouncementDetails = announcement => {
        setSelectedAnnouncementDetails(announcement);
        setDetailModalVisible(true);
    };

    const hideAnnouncementDetails = () => {
        setSelectedAnnouncementDetails(null);
        setDetailModalVisible(false);
    };

    const renderModalContent = () => (
        <Form form={form} layout="vertical">
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                <Input placeholder="Please Enter A Title" />
            </Form.Item>
            <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please input the content!' }]}>
                <Input placeholder="Please Enter A Content" />
            </Form.Item>
            <Form.Item name="announcementDate" label="Date" rules={[{ required: true, message: 'Please input the date!' }]}>
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder={selectedAnnouncement ? selectedAnnouncement.announcementDate : "Select date"}
                />
            </Form.Item>
            <Form.Item name="photoUrl" label="Photo URL">
                <Input placeholder="Please Enter An Invalid Photo URL" />
            </Form.Item>
        </Form>
    );

    const renderDetailModalContent = () => (
        <div style={{ textAlign: 'center' }}>
            <h3>Title: {selectedAnnouncementDetails.title}</h3>
            <p>Content: {selectedAnnouncementDetails.content}</p>
            <p>Date: {selectedAnnouncementDetails.announcementDate}</p>
            {selectedAnnouncementDetails.photoUrl && (
                <div>
                    <img src={selectedAnnouncementDetails.photoUrl} alt="Announcement" style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 10 }} />
                </div>
            )}
        </div>
    );


    const filteredAnnouncements = searchText ? announcements.filter(a =>
        a.title.toLowerCase().includes(searchText.toLowerCase()) ||
        a.id.toString().startsWith(searchText)
    ) : announcements;

    return (
        <div className="admin-announcements-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 10, padding: 10 }}>
                <Input
                    placeholder="Search an announcements by announcement title or announcement id"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 900 }}
                />
                <Button
                    type="primary"
                    icon={<PlusSquareOutlined />}
                    onClick={() => handleModalOpen()}
                    style={{ marginLeft: 'auto' }}
                >
                    Add Announcement
                </Button>
            </div>

            <div className="table-container">
                <Table dataSource={filteredAnnouncements} rowKey="id" pagination={{ pageSize: 5 }}>
                    <Table.Column title="ID" dataIndex="id" key="id" />
                    <Table.Column title="Title" dataIndex="title" key="title" />
                    <Table.Column title="Content" dataIndex="content" key="content" />
                    <Table.Column title="Date" dataIndex="announcementDate" key="date" />
                    <Table.Column
                        title="Actions"
                        key="actions"
                        render={(text, announcement) => (
                            <Space size="middle">
                                <Button icon={<EditOutlined />} onClick={() => handleModalOpen(announcement)} />
                                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(announcement.id)} />
                                <Button icon={<InfoCircleOutlined />} onClick={() => showAnnouncementDetails(announcement)} />
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
                {renderModalContent()}
            </Modal>

            <Modal
                title={<div style={{ textAlign: 'center' }}>Announcement Details</div>}
                visible={detailModalVisible}
                onCancel={hideAnnouncementDetails}
                footer={null}
            >
                {selectedAnnouncementDetails && renderDetailModalContent()}
            </Modal>

        </div>
    );

}

export default AdminAnnouncements;
