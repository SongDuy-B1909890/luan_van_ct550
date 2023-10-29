import React from 'react';
import HeaderPage from './header';
// import WatchPage from './watch';
import MoviePage from './movie';
const Home = () => {
  return (
    <div>
      <HeaderPage />
      <MoviePage />
      {/* <WatchPage/> */}
    </div>
  );
}
export default Home

