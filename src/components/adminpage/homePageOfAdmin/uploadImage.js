import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getImageById, saveImage } from "../../../store/imageSlice";

function UploadImage() {
  const dispatch = useDispatch();
  const image = useSelector(state => state.image.image);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [base64Image, setBase64Image] = useState(null); // Yeni state tanımı

  useEffect(() => {
    // Component yüklendiğinde çalışacak
    dispatch(getImageById({ id:19 })); // Çekmek istediğiniz görüntünün ID'sini belirtin
    setBase64Image(image.base64Image)
  });

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
      dispatch(saveImage({name:file.name,base64Image:base64Image}))
    }
    reader.onerror = () => {
      console.error("Error occurred while reading the file.");
    };
  }


  return (
    <div className="App">
      <h1>Upload Files In React</h1>
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
      <img src={`${base64Image}`} alt="Base64 Image" />
      </div>
    </div>
  );
}

export default UploadImage;
