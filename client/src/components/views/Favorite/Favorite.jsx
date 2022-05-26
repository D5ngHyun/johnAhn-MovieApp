import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

function Favorite({ movieInfo, movieId, userFrom }) {
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const { backdrop_path: moviePost, title, runtime } = movieInfo;

  let variables = {
    userFrom,
    movieId,
    moviePost,
    title,
    runtime,
  };

  const onClickFavorite = () => {
    if (favorited) {
      axios.post('/api/favorite/removeFromFavorite').then((res) => {
        if (res.data.success) {
          setFavoriteNumber((prev) => prev - 1);
          setFavorited(!favorited);
        } else {
          alert('Favorite 리스트에서 지우는걸 실패했어요.');
        }
      });
    } else {
      axios.post('/api/favorite/addToFavorite').then((res) => {
        if (res.data.success) {
          setFavoriteNumber((prev) => prev + 1);
          setFavorited(!favorited);
        } else {
          alert('Favorite 리스트에 추가하는걸 실패했어요.');
        }
      });
    }
  };

  useEffect(() => {
    axios.post('/api/favorite/favoriteNumber', variables).then((res) => {
      if (res.data.success) {
        setFavoriteNumber(res.data.favorite);
      } else {
        alert('숫자 정보를 가져오는데 실패했어요.');
      }
    });

    axios.post('/api/favorite/favorited', variables).then((res) => {
      if (res.data.success) {
        setFavorited(res.data.favorited);
      } else {
        alert('정보를 가져오는데 실패했어요.');
      }
    });
  }, []);

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {favorited ? 'Not Favorite' : 'Add to Favorite'} {favoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
