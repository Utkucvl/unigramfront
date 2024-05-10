import React from 'react';
import { Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option, OptGroup } = Select;

const AdminClubForm = ({ form, isUpdateMode, selectedClub }) => {
    return (
        <Form form={form} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                <Input placeholder="Enter the name of the Club" />
            </Form.Item>
            <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please input the content!' }]}>
                <Input.TextArea placeholder="Enter the content of the club" />
            </Form.Item>
            <Form.Item name="communication" label="Communication" rules={[{ required: true, message: 'Please input the communication details!' }]}>
                <Input placeholder="Enter communication details" />
            </Form.Item>
            
          
        </Form>
    );
}

export default AdminClubForm;
