import React from 'react';
import Card from './Card';

function ProfileCard(props) {

  return (
    <div>
      <Card
        title="Goni Kim"
        backgroundColor="#dee7ff"
      >
        <p>안녕하세요 천준우입니다.</p>
        <p>리액트 정말 어렵습니다.</p>
      </Card>

      <Card
        title="리액트"
        backgroundColor="#eee"
      >
        <p>리</p>
        <p>액</p>
        <p>트</p>
        <p>짱</p>
      </Card>
    </div>
  );
}

export default ProfileCard;