import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import GridCards from '../commons/GridCards';
import Favorite from '../Favorite/Favorite';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {
  const movieId = props.match.params.movieId;
  const [movie, setMovie] = useState('');
  const [casts, setCasts] = useState('');
  const [actorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
      });

    fetch(endpointCrew)
      .then((res) => res.json())
      .then((res) => {
        setCasts(res.cast);
      });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!actorToggle);
  };

  return (
    <div>
      {/* Header */}

      {movie && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
          title={movie.original_title}
          text={movie.overview}
        />
      )}

      {/* Body */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {movie && (
            <Favorite
              movieInfo={movie}
              movieId={movieId}
              userFrom={localStorage.getItem('userId')}
            />
          )}
        </div>

        {/* Movie Info */}
        {movie && <MovieInfo movie={movie} />}

        <br />
        {/* Actors Grid */}

        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}
        >
          <button onClick={toggleActorView}> Toggle Actor View </button>
        </div>

        {actorToggle && (
          <Row gutter={[16, 16]}>
            {casts &&
              casts.map((cast, index) => {
                console.log(cast);
                return (
                  <React.Fragment key={index}>
                    <GridCards
                      image={
                        cast.profile_path
                          ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                          : null
                      }
                      characterName={cast.name}
                    />
                  </React.Fragment>
                );
              })}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
