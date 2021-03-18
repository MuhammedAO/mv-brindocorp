import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../config'
import MainImage from '../LandingPage/Sections/MainImage'
import { Descriptions, Button, Row } from 'antd'
import GridCard from '../LandingPage/GridCard'
import Favorite from './Sections/Favorite'
import MovieInfo from './Sections/MovieInfo'

function MovieDetailPage(props) {

  const movieId = props.match.params.movieId

  const [Movie, setMovie] = useState([])
  const [Crews, setCrews] = useState([])
  const [ActorToggle, setActorToggle] = useState(false)
  const [LoadingForMovie, setLoadingForMovie] = useState(true)


  useEffect(() => {

    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(response => {
        setMovie(response)
        setLoadingForMovie(false)

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then(response => response.json())
          .then(response => {
            // console.log(response)
            setCrews(response.cast)
          })

      })

  }, [movieId])

  const loadActors = () => {
    setActorToggle(!ActorToggle)
  }

  return (
    <div>
      {/* Main Image */}
      {!LoadingForMovie ?
        <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`}
          title={Movie.original_title} text={Movie.overview} />
        :
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          Loading...
          </div>
      }

      {/* Body */}

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Favorite userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={Movie} />
        </div>

        {/* Movie Info Table */}

        {!LoadingForMovie ?
          <MovieInfo movie={Movie} />
          :
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            Loading...
          </div>
        }

        <br />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <Button onClick={loadActors}>Toggle Movie Casts</Button>
        </div>



        {/* Grid Cars for Crews */}

        {ActorToggle &&
          <Row gutter={[16, 16]}>
            {Crews && Crews.map((crew, index) => (
              <React.Fragment key={index}>
                {crew.profile_path &&
                  <GridCard
                    actor image={`${IMAGE_URL}w500${crew.profile_path}`}
                  />
                }
              </React.Fragment>
            ))}

          </Row>
        }
      </div>

    </div>
  )
}

export default MovieDetailPage