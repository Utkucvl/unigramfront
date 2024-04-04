import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Card, Input } from "antd"; // Input componentini import ettik
import Meta from "antd/es/card/Meta";
import ActivityModal from "./ActivityModal";

import "alertifyjs/build/css/alertify.css";
import { useCookies } from "react-cookie";
import { getActivities } from "../../store/activitySlice";

function ActivityList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Activities = useSelector((state) => state.activity.activities);
  const isAuthenticated = useSelector((state) => state.security.isAuthenticated);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimini saklamak için state

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    if (isAuthenticated) {
      setModalVisible(true);
    } else {
      navigate("/signin");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Aktiviteleri aramak için bir filtre fonksiyonu
  const filteredActivities = Activities.filter((activity) =>
    activity.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="dışDiv" style={{ display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center' }}>
      {/* Aktivitelerin listelendiği bölüm */}
      <div style={{ marginBottom: '20px', alignSelf: 'center', textAlign: 'center', width: '100%', maxWidth: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}> {/* Yatay eksende büyütme ve gölgelendirme için stil özelliklerini ekledik */}
        <Input
          placeholder="Search an Event..."
          style={{ width: '100%', padding: '12px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} // Stil özelliklerini güncelledik
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {filteredActivities.map((activity) => (
            <Card
              key={activity.id}
              hoverable
              style={{
                width: 250,
                height: 360,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onClick={() => handleActivityClick(activity)}
            >
              <div style={{ height: '160px', overflow: 'hidden' }}>
                <img alt="activity" src={activity.photoUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '10px' }}>
                <Card.Meta title={activity.name} style={{ marginBottom: '10px' }} />
                <p style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical'
                }}>
                  {activity.content}
                </p>
              </div>
              <div style={{ padding: '10px', textAlign: 'right' }}>
                <span style={{
                  color: '#b6b7b8'
                }}>
                  {String(activity.date)}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ActivityModal
        activity={selectedActivity}
        visible={modalVisible && isAuthenticated}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );


}

export default ActivityList;
