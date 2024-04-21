import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Space, Modal, Form, Input, DatePicker, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusSquareOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { getActivities, deleteActivity, updateActivity, saveActivity } from '../../store/activitySlice';
import { getClubs } from '../../store/clubSlice';
import moment from 'moment';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

function AdminActivity() {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activity.activities);
    const clubs = useSelector(state => state.club.clubs);
    const [modalVisible, setModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedActivityDetails, setSelectedActivityDetails] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(getClubs());
        dispatch(getActivities());
    }, [dispatch, activities]);

    useEffect(() => {
        if (selectedActivity && modalVisible) {
            const formattedActivity = {
                ...selectedActivity,
                date: selectedActivity.date ? moment(selectedActivity.date) : null,
            };
            form.setFieldsValue(formattedActivity);
        }
    }, [selectedActivity, modalVisible, form]);

    const handleDelete = id => {
        Modal.confirm({
            title: "Warning!",
            content: "Are you sure you want to delete this activity?",
            okText: "Yes",
            cancelText: "No",
            onOk() {
                dispatch(deleteActivity({ id }));
                alertify.success('Activity deleted');
            },
            onCancel() {
                alertify.error('Delete cancelled');
            }
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
            if (!values.clubId) {
                alertify.error('Please select a club!');
                return;
            }
            if (!values.date || !moment(values.date).isValid()) {
                alertify.error('Invalid date');
                return;
            }

            const payload = {
                ...values,
                date: values.date.format('YYYY-MM-DD'),
                clubid: values.clubId,
                id: selectedActivity?.id
            };
            delete payload.clubId;
            if (isUpdateMode) {
                console.log(payload)
                dispatch(updateActivity(payload));

                alertify.success('Activity updated successfully');
            } else {
                dispatch(saveActivity(payload));
                alertify.success('Activity added successfully');
                dispatch(getActivities());
            }
            dispatch(getActivities());
            handleModalClose();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            alertify.error('Failed to process the request');
        }
    };

    const showActivityDetails = activity => {
        setSelectedActivityDetails(activity);
        setDetailModalVisible(true);
    };

    const hideActivityDetails = () => {
        setSelectedActivityDetails(null);
        setDetailModalVisible(false);
    };

    const renderModalContent = () => (
        <Form form={form} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                <Input placeholder="Enter the name of the activity" />
            </Form.Item>
            <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please input the content!' }]}>
                <Input.TextArea placeholder="Enter the content of the activity" />
            </Form.Item>
            <Form.Item name="place" label="Place" rules={[{ required: true, message: 'Please input the place!' }]}>
                <Input placeholder="Enter the place of the activity" />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please input the date!' }]}>
                <DatePicker
                    style={{ width: '100%' }}
                    placeholder="Select date for the activity"
                />
            </Form.Item>
    
            <Form.Item name="photoUrl" label="Photo URL">
                <Input placeholder="Enter the URL of the photo for the activity" />
            </Form.Item>
            <Form.Item name="clubId" label="Club" rules={[{ required: true, message: 'Please select a club!' }]}>
                <Select
                    showSearch
                    placeholder="Select a club"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {clubs.map(club => (
                        <Select.Option key={club.id} value={club.id}>{club.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
    

    const renderDetailModalContent = () => (
        <div style={{ textAlign: 'center' }}>
            <h3>Name: {selectedActivityDetails.name}</h3>
            <p>Content: {selectedActivityDetails.content}</p>
            <p>Place: {selectedActivityDetails.place}</p>
            <p>Date: {selectedActivityDetails.date}</p>
            <p>Club: {selectedActivityDetails.clubid ? clubs.find(club => club.id === selectedActivityDetails.clubid)?.name : 'Unknown'}</p>
            {selectedActivityDetails.photoUrl && (
                <div>
                    <img src={selectedActivityDetails.photoUrl} alt="Activity" style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 10 }} />
                </div>
            )}
            {/* Additional details if needed */}
        </div>
    );

    const filteredActivities = searchText ? activities.filter(activity =>
        activity.name.toLowerCase().includes(searchText.toLowerCase()) ||
        activity.place.toLowerCase().includes(searchText.toLowerCase()) ||
        activity.id.toString().startsWith(searchText)
    ) : activities;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 10, padding: 10 }}>
                <Input
                    placeholder="Search an activities by name, place, or activity ID"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
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
                        const club = clubs.find(club => club.id === clubid);
                        return club ? club.name : 'Unknown';
                    }}
                />

                <Table.Column
                    title="Actions"
                    key="actions"
                    render={(text, activity) => (
                        <Space size="middle">
                            <Button icon={<EditOutlined />} onClick={() => handleModalOpen(activity)} />
                            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(activity.id)} />
                            <Button icon={<InfoCircleOutlined />} onClick={() => showActivityDetails(activity)} />
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

            <Modal
                title={<div style={{ textAlign: 'center' }}>Activity Details</div>}
                visible={detailModalVisible}
                onCancel={hideActivityDetails}
                footer={null}
            >
                {selectedActivityDetails && renderDetailModalContent()}
            </Modal>
        </div>
    );
}

export default AdminActivity;
