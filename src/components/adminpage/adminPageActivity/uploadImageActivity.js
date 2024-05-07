import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveImageActivity } from "../../../store/imageSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import resim1 from './uploadphoto.jpg'; // Ensure you have an appropriate image

function UploadImageActivity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activityId } = useParams();
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      console.log("No File Selected");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      console.log(base64Image);
      dispatch(saveImageActivity({ name: file.name, base64Image: base64Image, activityId }));
      message.success('Image uploaded successfully!');
      navigate("/adminactivity")
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
            <Button icon={<UploadOutlined />} style={{ marginTop: '10px', width: '200px', height: '50px', fontSize: '16px', padding: '10px', backgroundColor : "rgba(0,125,254,255)" }} >Choose file</Button>
          </Upload>
          <Button onClick={handleUpload} style={{ marginTop: '10px', width: '200px', height: '50px', backgroundColor : "rgba(0,125,254,255)"  }}>Upload</Button>
        </div>
        <div className="UploadPhoto" style={{ width: '50%' }}>
          <img src={resim1} alt="Upload illustration" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
}

export default UploadImageActivity;
