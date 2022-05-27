import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './FavoritePage.css';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    axios
      .post('/api/favorite/getFavoriteMovie', {
        userFrom: localStorage.getItem('userId'),
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setFavorites(res.data.favorites);
        } else {
          alert('영화 정보를 가져오는데 실패했어요');
        }
      });
  };

  const onClickDelete = (movieId, userFrom) => {
    console.log(movieId, userFrom);
    const variables = {
      movieId,
      userFrom,
    };

    axios.post('/api/favorite/removeFromFavorite', variables).then((res) => {
      if (res.data.success) {
        fetchFavoredMovie();
      } else {
        alert('리스트에서 지우는데 실패했습니다.');
      }
    });
  };

  const renderCards = favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          'no Image'
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime}</td>
        <td>
          <button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <td>Remove from Favorites</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
