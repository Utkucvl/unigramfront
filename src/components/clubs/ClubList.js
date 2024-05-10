import React, { useState, useEffect } from "react";
import { Card, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ClubModal from "./ClubModal";
import { getClubs } from "../../store/clubSlice";
import { getMyClubs } from "../../store/myClubSlice";
import { getImageByIdClub } from "../../store/imageSlice";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";


function ClubList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clubs = useSelector((state) => state.club.clubs);
  const myClubs = useSelector((state) => state.myClub.myClubs);
  const isAuthenticated = useSelector(
    (state) => state.security.isAuthenticated
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageSources, setImageSources] = useState({});

  useEffect(() => {
    dispatch(getClubs());
    dispatch(getMyClubs({ userId: localStorage.getItem("userId") }));
  }, [dispatch]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const sources = {};
        await Promise.all(clubs.map(async (club) => {
          const result = await dispatch(getImageByIdClub(club));
          sources[club.id] = result.payload.base64Image;
        }));
        setImageSources(sources);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [dispatch, clubs]);

  const closeModal = () => {
    setModalVisible(false);
    dispatch(getClubs());
    dispatch(getMyClubs({ userId: localStorage.getItem("userId") }));
  };

  const handleClubClick = (club) => {
    setSelectedClub(club);
    setModalVisible(true);
  };

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dışDiv" style={{ display: "flex", flexDirection: "column", padding: "", alignItems: "center", backgroundColor: "#f5f5f5", height: "100vh" }}>
      <div style={{ marginBottom: "20px", marginTop: "20px", alignSelf: "center", textAlign: "center", width: "100%", maxWidth: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <Input placeholder="Search a Club..." placeholderTextColor="black" style={{ width: "100%", padding: "12px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {filteredClubs.map((club) => {
            const isJoined = myClubs.find((myClub) => myClub.id === club.id);
            return (
              <Card
                key={club.id}
                hoverable
                style={{ width: 240, height: 400, marginBottom: "10px" }}
                onClick={() => handleClubClick(club)}
                cover={<img src={imageSources[club.id]} alt="Club" style={{ width: "100%", height: "160px", objectFit: "cover" }} />}
              >
                <div style={{ padding: "" }}>
                  <Meta
                    title={club.name}
                    description={<span style={{ fontWeight: "bold" }}>{club.clubName}</span>}
                    style={{ marginBottom: "" }}
                  />
                  <p style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical" }}>{club.content}</p>
                  <div style={{ color: isJoined ? "blue" : "red", fontSize: "18px" }}>
                    {isJoined ? (
                      <>
                        <CheckOutlined />
                        <span>Joined</span>
                      </>
                    ) : (
                      <>
                        <CloseOutlined />
                        <span>Unjoined</span>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedClub && (
        <ClubModal
          club={selectedClub}
          visible={modalVisible}
          onClose={() => closeModal()}
          isJoined={myClubs.find((myClub) => myClub.id === selectedClub.id)}
        />
      )}
    </div>
  );
}

export default ClubList;