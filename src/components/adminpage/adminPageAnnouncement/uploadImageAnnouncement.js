import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveImageAnnouncement } from "../../../store/imageSlice";
import { useNavigate, useParams } from "react-router-dom";
import resim1 from './uploadphoto.jpg';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UploadImageAnnouncement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { announcementId } = useParams();
  const image = useSelector(state => state.image.image);
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const handleUpload = () => {
    if (!file) {
      console.log("No File Selected");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      console.log(result);
      dispatch(saveImageAnnouncement({ name: file.name, base64Image: result, announcementId }));
      message.success('Image uploaded successfully!');
      navigate("/adminannouncement")
    };
    reader.onerror = () => {
      console.error("Error occurred while reading the file.");
      message.error('Failed to read file.');
    };
  }

  const props = {
    beforeUpload: file => {
      setFile(file);
      return false;
    },
    onRemove: () => {
      setFile(null);
    }
  };

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "rgba(30,31,111,255)" }}>
      <div className="Cover" style={{
        backgroundColor: "white", padding: "20px", boxSizing: 'border-box',
        height: "650px", width: '1450px', borderRadius: "25px",
        display: 'flex', justifyContent: 'space-around', alignItems: 'center'
      }}>
        <div className="Uploading" style={{
          width: '50%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div className="TextDiv" style={{ marginBottom: '20px', width: '100%' }}>
            <h1 style={{
              textAlign: 'center',
              fontSize: '50px',
              margin: '0 0 100px 0'
            }}>Select A Photo To Upload</h1>
          </div>
          <Upload {...props} accept="image/*" listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}style={{ marginTop: '10px', width: '200px', height: '50px', fontSize: '16px', padding: '10px', backgroundColor: "rgba(0,125,254,255)", color: "white" }}>Choose file</Button>
          </Upload>
          <Button onClick={handleUpload} style={{ marginTop: '10px', width: '200px', height: '50px', backgroundColor: "rgba(0,125,254,255)", color: "white" }}>Upload</Button>
          {msg && <span>{msg}</span>}
        </div>
        <div className="UploadPhoto" style={{ width: '50%' }}>
          <img src={resim1} alt="Upload illustration" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
}

export default UploadImageAnnouncement;
