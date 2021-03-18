import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_SIZE, POSTER_SIZE, IMAGE_URL } from '../../config'
import { Typography, Row, Button } from 'antd'
import MainImage from './Sections/MainImage'
import GridCard from './GridCard'

const { Title } = Typography

function LandingPage() {

  const [Movies, setMovies] = useState([])
  const [CurrentPage, setCurrentPage] = useState(0)
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint)
  }, [])

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        setMovies([...Movies, ...response.results])
        setCurrentPage(response.page)
      })

  }

  const loadMore = () => {
    let endpoint = '';
    setLoading(true)
    console.log('CurrentPage', CurrentPage)
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
    fetchMovies(endpoint);

  }
  return (
    <div style={{ width: '100%', margin: '0' }}>

      {/*main image*/}

      {
        Movies[0] && <MainImage
          image={`${IMAGE_URL}${IMAGE_SIZE}${Movies[0].backdrop_path}`}
          title={Movies[0].original_title}
          text={Movies[0].overview}
        />
      }

      {/*body*/}
      <div style={{ width: '85%', margin: '1rem auto' }}>

        <Title level={2} > Latest Movies </Title>
        <hr />

        {/*Grid*/}
        <Row gutter={[16, 16]}>
          {Movies && Movies.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCard
                image={movie.poster_path ?
                  `${IMAGE_URL}${POSTER_SIZE}${movie.poster_path}`
                  : null}
                movieId={movie.id}
                movieName={movie.original_title}
              />
            </React.Fragment>
          ))}
        </Row>

        {/*Load more btn*/}

        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={loadMore}>Load More</Button>
        </div>
      </div>

    </div>
  )
}

export default LandingPage