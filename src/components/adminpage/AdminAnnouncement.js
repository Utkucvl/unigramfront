import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Space, Modal, Form, Input } from 'antd';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { getAnnouncements, deleteAnnouncement, updateAnnouncement, saveAnnouncement } from '../../store/announcementSlice';
import Column from 'antd/es/table/Column';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

function AdminAnnouncements() {
    const dispatch = useDispatch();
    const announcements = useSelector(state => state.announcement.announcements);
    const [modalVisible, setModalVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [form] = Form.useForm();
    const [updatedAnnouncementId, setUpdatedAnnouncementId] = useState(null);

    useEffect(() => {
        dispatch(getAnnouncements());
    }, [dispatch]);

    useEffect(() => {
        if (selectedAnnouncement && modalVisible) {
            form.setFieldsValue(selectedAnnouncement);
        }
    }, [selectedAnnouncement, modalVisible, form]);


    const handleDelete = id => {
        alertify.confirm("Are you sure you want to delete this announcement?", () => {
            dispatch(deleteAnnouncement({ id }));
            alertify.success('Announcement deleted');
            window.location.reload(); 
        }, () => {
            alertify.error('Delete cancelled');
        });
    };
    const handleModalOpen = (announcement = null) => {
        setSelectedAnnouncement(announcement);
        setIsUpdateMode(announcement !== null);
        setModalVisible(true);
        form.resetFields();
    };

    const handleModalClose = () => {
        setModalVisible(false);
        form.resetFields();
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (isUpdateMode) {
                dispatch(updateAnnouncement({ ...selectedAnnouncement, ...values }));
                alertify.success('Announcement updated successfully');
                setUpdatedAnnouncementId(selectedAnnouncement.id);
            } else {
                dispatch(saveAnnouncement(values));
                alertify.success('Announcement added successfully');
            }
            handleModalClose();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    useEffect(() => {
        if (updatedAnnouncementId) {
            window.location.reload();
            setUpdatedAnnouncementId(null);
        }
    }, [updatedAnnouncementId]);

    const renderModalContent = () => (
        <Form form={form} layout="vertical">
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please input the content!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please input the date!' }]}>
                <Input />
            </Form.Item>
        </Form>
    );

    return (
        <div>
            <Table dataSource={announcements} rowKey="id">
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Title" dataIndex="title" key="title" />
                <Column title="Content" dataIndex="content" key="content" />
                <Column title="Date" dataIndex="date" key="date" />
                <Column
                    title="Actions"
                    key="actions"
                    render={(text, announcement) => (
                        <Space size="middle">
                            <Button icon={<EditOutlined />} onClick={() => handleModalOpen(announcement)} />
                            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(announcement.id)} />
                        </Space>
                    )}
                />
            </Table>

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

            <Button
                type="primary"
                icon={<PlusSquareOutlined />}
                onClick={() => handleModalOpen()}
                style={{ marginTop: 16 }}
            >
                Add Announcement
            </Button>
        </div>
    );
}

export default AdminAnnouncements;
