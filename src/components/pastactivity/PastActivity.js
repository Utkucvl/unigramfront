import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Card, Input } from "antd"; // Input componentini import ettik
import Meta from "antd/es/card/Meta";
import PastActivityModal from "./PastActivityModal";
import { getImageByIdActivity } from "../../store/imageSlice";



import "alertifyjs/build/css/alertify.css";
import { useCookies } from "react-cookie";
import { getActivities, getPastActivities } from "../../store/activitySlice";

function PastActivity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pastActivities = useSelector((state) => state.activity.activities);
  const isAuthenticated = useSelector((state) => state.security.isAuthenticated);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimini saklamak için state
  const [imageSources, setImageSources] = useState({}); // New state to hold image sources

  useEffect(() => {
    dispatch(getPastActivities());
  }, [dispatch]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const sources = {};
        await Promise.all(pastActivities.map(async (activity) => {
          const result = await dispatch(getImageByIdActivity(activity));
          sources[activity.id] = result.payload.base64Image;
        }));
        setImageSources(sources);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [dispatch, pastActivities]);

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
  const filteredActivities = pastActivities.filter((activity) =>
    activity.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="dışDiv" style={{ display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
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
              style={{ width: 240, height: 360, overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: "10" }}
              cover={<img alt="announcement" src={imageSources[activity.id]} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />}
              onClick={() => handleActivityClick(activity)}
            >
              <div style={{ padding: '' }}>
                <Card.Meta title={activity.name} style={{ marginBottom: '' }}
                  description={<span style={{ fontWeight: "bold" }}>{activity.clubName}</span>}
                />
                <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
                  {activity.content}
                </p>
                <span style={{ color: '#b6b7b8', marginBottom: "10px" }}>{String(activity.date)}</span>

              </div>

            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      <PastActivityModal
        activity={selectedActivity}
        visible={modalVisible && isAuthenticated}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );


}

export default PastActivity;
