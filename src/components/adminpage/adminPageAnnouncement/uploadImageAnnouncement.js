import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveImageAnnouncement } from "../../../store/imageSlice";
import { useParams } from "react-router-dom";

function UploadImageAnnouncement() {
  const dispatch = useDispatch();
  const { announcementId } = useParams();
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

    // Seçilen dosyayı oku
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Dosya okunduğunda base64 formatına çevir ve state'e ata
      setBase64Image(reader.result);
    };
    if(base64Image !=null){
      console.log(base64Image)
      dispatch(saveImageAnnouncement({name:file.name,base64Image:base64Image,announcementId:announcementId}))
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

export default UploadImageAnnouncement;