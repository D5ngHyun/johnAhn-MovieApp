import React from 'react';
import { Col } from 'antd';

function GridCards({ movieId, image, movieName, landingPage, characterName }) {
  if (landingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <a href={`/movie/${movieId}`}>
            <img
              style={{ width: '100%', height: '320px' }}
              src={image}
              alt={movieName}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <img
            style={{ width: '100%', height: '320px' }}
            src={image}
            alt={characterName}
          />
        </div>
      </Col>
    );
  }
}

export default GridCards;
