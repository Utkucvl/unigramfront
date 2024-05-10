// AdminClubs.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClubs } from "../../../store/clubSlice";

function AdminClubs() {
  const dispatch = useDispatch();
  const clubs = useSelector((state) => state.club.clubs);
  const loading = useSelector((state) => state.club.loading);

  useEffect(() => {
    dispatch(getClubs());
  }, [dispatch]);

  return (
    <div>
      <h2>Admin Clubs</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {clubs.map((club) => (
            <div key={club.id}>
              <h3>{club.name}</h3>
              <p>{club.description}</p>
             
            </div>
          ))}
         
        </div>
      )}
    </div>
  );
}

export default AdminClubs;
