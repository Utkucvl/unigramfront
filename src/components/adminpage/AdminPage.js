import React from "react";
import { useSelector } from "react-redux";
import video from './mesut.mp4';
import voice from './mesut1.mp3';

const AdminPage = () => {
  return (
    <div style={{ width: "100%", height: "89vh", display: "flex", justifyContent: "center", alignItems: "center" }}> 
      <video src={video} autoPlay loop muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <audio src={voice} autoPlay loop controls style={{ width: "0", height: "0", visibility: "hidden" }} />
    </div>
  );
};

export default AdminPage;
