import React from "react";

const Dashboard = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={
          "https://i.pinimg.com/564x/8b/0e/e3/8b0ee30259bed849d2fe6e54dbad38f7.jpg"
        }
        alt="Hospital"
        style={{ maxWidth: "100%", maxHeight: "50vh", borderRadius: "10px" , marginTop:"10px" }}
      />
      <h2 style={{ fontSize: "48px", marginTop: "20px" }}>
        Welcome to our hospital
      </h2>
      <p style={{ fontSize: "24px", marginTop: "10px" }}>
        We wish you healthy and happy days
      </p>
    </div>
  );
};

export default Dashboard;
