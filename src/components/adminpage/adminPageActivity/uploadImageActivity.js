import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveImageActivity, saveImageAnnouncement } from "../../../store/imageSlice";
import { useNavigate, useParams } from "react-router-dom";

function UploadImageActivity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activityId } = useParams();
  const image = useSelector(state => state.image.image);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [base64Image, setBase64Image] = useState(null); // Yeni state tanımı

    function handleUpload() {
      if (!file) {
        console.log("No File Selected");
        return;
      }
    
      // Dosya boyutunu kontrol et
      const fileSizeInBytes = file.size;
      console.log(fileSizeInBytes)
      const maxSizeInBytes = 0.05 * 1024 * 1024; // 5 MB'lık maksimum boyut
      if (fileSizeInBytes > maxSizeInBytes) {
        console.log("File size exceeds the limit");
        return;
      }
    
      // Dosya boyutu uygunsa işlem devam eder
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBase64Image(reader.result);
      };
      if (base64Image != null) {
        console.log(base64Image);
        dispatch(
          saveImageActivity({ name: file.name, base64Image: base64Image, activityId: activityId })
        );
        navigate("/adminactivity");
      }
      reader.onerror = () => {
        console.error("Error occurred while reading the file.");
      };
    }
    

  return (
    <div className="App">
      <h1>Upload Files In React Announcement</h1>
      <input
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        type="file"
      ></input>
      <button onClick={handleUpload}>Upload</button>
      {progress.started && <progress max="100" value={progress.pc}></progress>}
      {msg && <span>{msg}</span>}
      <div>
      </div>
    </div>
  );
}

export default UploadImageActivity;
