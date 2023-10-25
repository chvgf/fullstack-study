import React from 'react';
import { useNavigate } from 'react-router-dom';

function PlacePage(props) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>장소 페이지</h1>
      <button onClick={() => { navigate('/'); }}>메인으로</button>
    </div>
  );
}

export default PlacePage;