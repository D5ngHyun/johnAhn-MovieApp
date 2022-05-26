import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Favorite({ movieInfo, movieId, userFrom }) {
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const { backdrop_path, title, runtime } = movieInfo;
  console.log(backdrop_path, title, runtime);

  useEffect(() => {
    axios
      .post('/api/favorite/favoriteNumber', {
        userFrom,
        movieId,
      })
      .then((res) => {
        if (res.data.success) {
          setFavoriteNumber(res.data.favorite);
        } else {
          alert('숫자 정보를 가져오는데 실패했어요.');
        }
      });

    axios
      .post('/api/favorite/favorited', {
        userFrom,
        movieId,
      })
      .then((res) => {
        if (res.data.success) {
          setFavorited(res.data.favorited);
        } else {
          alert('정보를 가져오는데 실패했어요.');
        }
      });
  }, []);

  return (
    <div>
      <button>
        {favorited ? 'Not Favorite' : 'Add to Favorite'} {favoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
