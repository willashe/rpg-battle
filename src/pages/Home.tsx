import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>New Game</h1>
    <h1>Continue</h1>
    <Link to="About">
      <h1>About</h1>
    </Link>
  </div>
);

export default Home;
