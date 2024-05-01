// AnnouncementForm.js

import React from "react";
import { Form, Input, DatePicker } from "antd";

const AdminAnnouncementForm = ({ form, selectedAnnouncement }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input placeholder="Please Enter A Title" />
      </Form.Item>
      <Form.Item
        name="content"
        label="Content"
        rules={[{ required: true, message: "Please input the content!" }]}
      >
        <Input placeholder="Please Enter A Content" />
      </Form.Item>
      <Form.Item name="photoUrl" label="Photo URL">
        <Input placeholder="Please Enter An Invalid Photo URL" />
      </Form.Item>
    </Form>
  );
};

export default AdminAnnouncementForm;
