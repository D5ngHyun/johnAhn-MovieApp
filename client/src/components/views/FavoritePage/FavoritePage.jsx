import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './FavoritePage.css';

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
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
  }, []);

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
        <tbody>
          {favorites.map((favorite, index) => {
            return (
              <tr key={index}>
                <td>{favorite.movieTitle}</td>
                <td>{favorite.movieRunTime}</td>
                <td>
                  <button>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
