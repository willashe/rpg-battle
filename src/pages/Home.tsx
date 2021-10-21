import React, { useContext } from 'react';
import { AppStateContext } from '../state';
// import { actionCreators } from '../actions';
import { Link } from 'react-router-dom';

// const { startNewGame, gameOver } = actionCreators;

const Home = () => {
  const [state] = useContext(AppStateContext);
  const { heroes } = state;

  console.log(heroes);

  return (
    <>
      <div>
        {/* <Link to="/battle">
          <h1 onClick={() => dispatch(gameOver())}>New Game</h1>
        </Link>
        <Link to="/battle">
          <h1 onClick={() => dispatch(startNewGame())}>Continue</h1>
        </Link> */}
        <Link to="About">
          <h1>About</h1>
        </Link>
      </div>
    </>
  );
};

export default Home;
