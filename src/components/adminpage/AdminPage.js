import React from "react";
import video from './mesut.mp4';


const AdminPage = () => {
  return (
    <div style={{ width: "100%", height: "89vh", display: "flex", justifyContent: "center", alignItems: "center" }}> 
      <video src={video} autoPlay loop muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
};

export default AdminPage;
