import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Space, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { getActivities, deleteActivity, updateActivity, saveActivity } from '../../store/activitySlice';
import Column from 'antd/es/table/Column';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

function AdminActivity() {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activity.activities);
    const [modalVisible, setModalVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [form] = Form.useForm();
    const [updatedActivityId, setUpdatedActivityId] = useState(null);

    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch]);

    useEffect(() => {
        if (selectedActivity && modalVisible) {
            form.setFieldsValue(selectedActivity);
        }
    }, [selectedActivity, modalVisible, form]);

    const handleDelete = id => {
        alertify.confirm("Are you sure you want to delete this activity?", () => {
            dispatch(deleteActivity({ id }));
            alertify.success('Activity deleted');
        }, () => {
            alertify.error('Delete cancelled');
        });
    };

    const handleModalOpen = (activity = null) => {
        setSelectedActivity(activity);
        setIsUpdateMode(activity !== null);
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
                dispatch(updateActivity({ ...selectedActivity, ...values }));
                alertify.success('Activity updated successfully');
                setUpdatedActivityId(selectedActivity.id);  // Set the updated ID to trigger the reload
            } else {
                dispatch(saveActivity(values));
                alertify.success('Activity added successfully');
            }
            handleModalClose();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    useEffect(() => {
        if (updatedActivityId) {
            window.location.reload(); 
            setUpdatedActivityId(null); 
        }
    }, [updatedActivityId]);

    const renderModalContent = () => (
        <Form form={form} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please input the content!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="place" label="Place" rules={[{ required: true, message: 'Please input the place!' }]}>
                <Input />
            </Form.Item>
        </Form>
    );

    return (
        <div>
            <Table dataSource={activities} rowKey="id">
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Content" dataIndex="content" key="content" />
                <Column title="Place" dataIndex="place" key="place" />
                <Column
                    title="Actions"
                    key="actions"
                    render={(text, activity) => (
                        <Space size="middle">
                            <Button icon={<EditOutlined />} onClick={() => handleModalOpen(activity)} />
                            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(activity.id)} />
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
                {renderModalContent()}
            </Modal>

            <Button
                type="primary"
                icon={<PlusSquareOutlined />}
                onClick={() => handleModalOpen()}
                style={{ marginTop: 16 }}
            >
                Çalışmaz Düzenlenecek / 
                Add Activity
            </Button>
        </div>
    );
}

export default AdminActivity;
