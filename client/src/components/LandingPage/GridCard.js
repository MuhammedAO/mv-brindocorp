import React from 'react'
import { Col } from 'antd'


const GridCard = ({ image, movieId, movieName, }) => {
  return (
    <Col lg={6} md={8} xs={24}>
      <div style={{ position: 'relative' }}>
        <a href={`/movie/${movieId}`} >
          <img style={{ width: '100%', height: '320px' }} alt={movieName} src={image} />
        </a>
      </div>
    </Col>
  )
}

export default GridCard
