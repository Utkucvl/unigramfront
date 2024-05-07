// AdminActivityForm.js

import React from 'react';
import { Form, Input, DatePicker, Select } from 'antd';
import moment from "moment";

const { Option } = Select;

const AdminActivityForm = ({ form, clubs, isUpdateMode, selectedActivity }) => {
    return (
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
                    disabledDate={current => current && current < moment().startOf('day')}
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
                    value={isUpdateMode ? selectedActivity?.clubid : undefined}
                >
                    {clubs.map(club => (
                        <Option key={club.id} value={club.id}>{club.name}</Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
}

export default AdminActivityForm;
