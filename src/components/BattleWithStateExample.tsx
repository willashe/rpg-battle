import { useContext } from 'react';

import { AppStateContext } from '../state';
// import { actionCreators } from '../actions';

// const { startNewGame, gameOver } = actionCreators;

const Battle = () => {
  const [state] = useContext(AppStateContext);
  const { heroes, enemies } = state;

  console.log(heroes);
  console.log(enemies);

  return (
    <>
      <h1>Battle!</h1>

      {/* <button onClick={() => dispatch(startNewGame())}>New Game</button>
      <button onClick={() => dispatch(gameOver())}>Game Over</button> */}
    </>
  );
};

export default Battle;
