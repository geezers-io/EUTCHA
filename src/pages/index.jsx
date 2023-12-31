import React, { useEffect, useState } from 'react';
import { getMovies } from '@/api/client';
import MovieCard from '@/components/MovieCard';
import styled from '@emotion/styled';
import InfiniteScroll from '@/components/InfiniteScroll';

const MovieListPage = () => {
  const [movies, setMovies] = useState({
    loading: true,
    list: [],
    page: 1,
  });

  const getMoreMovieList = async () => {
    try {
      const { page, results } = await getMovies(movies.page + 1);
      setMovies({
        page,
        list: movies.list.concat(results),
        loading: false,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const movies = await getMovies();
        setMovies(() => ({
          page: movies.page,
          loading: false,
          list: movies.results,
        }));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (movies.loading) {
    return null;
  }
  return (
    <InfiniteScroll load={getMoreMovieList} hasMore>
      <MovieList>
        {movies.list.map(item => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </MovieList>
    </InfiniteScroll>
  );
};

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2rem 1.66rem;
`;

export default MovieListPage;
