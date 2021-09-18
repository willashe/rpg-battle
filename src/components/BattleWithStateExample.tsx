import { useContext } from 'react';

import { AppStateContext } from '../state';
import { actions } from '../actions';

const { startNewGame, gameOver } = actions;

const Battle = () => {
  const [{ heroes, enemies }, dispatch] = useContext(AppStateContext);

  console.log(heroes);
  console.log(enemies);

  return (
    <>
      <h1>Battle!</h1>

      <button onClick={() => dispatch(startNewGame())}>New Game</button>
      <button onClick={() => dispatch(gameOver())}>Game Over</button>
    </>
  );
};

export default Battle;
