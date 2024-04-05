import React from 'react';
import { Link } from 'react-router-dom';

const NotMyActivity = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      Bu kısmı görmek için <Link to="/signin">giriş yapmalısınız</Link>.
    </div>
  );
};

export default NotMyActivity;
