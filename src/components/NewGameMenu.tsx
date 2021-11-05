import { useContext, useState } from 'react';
import styled from 'styled-components';

import { AppStateContext } from '../state';
import { actionCreators } from '../actions';
import { EntityTypesEnum, GameStatesEnum } from '../constants';
import { generateHeroes, generateEnemies } from '../utils';
import Window from './Window';

const { FROGGY, SAKOFF } = EntityTypesEnum;
const { EXECUTING, GAME_WON, GAME_LOST } = GameStatesEnum;
const { startNewGame: startNewGameAction } = actionCreators;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  border: 1px solid;
  border-radius: 8px;
  margin: 0 auto;
`;

const NewGameMenu = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const { gameState } = state;
  const [numHeroes, setNumHeroes] = useState(4);
  const [numLeftEnemies, setNumLeftEnemies] = useState(3);
  const [numRightEnemies, setNumRightEnemies] = useState(1);

  const startNewGame = () => {
    const newGameData = {
      gameState: EXECUTING,
      queue: [],
      queueIndex: null,
      playerInterrupt: false,
      groups: {
        player: {
          entities: generateHeroes(numHeroes),
          message: '',
        },
        leftEnemies: {
          type: FROGGY,
          message: '',
          entities: generateEnemies(numLeftEnemies, FROGGY, 'leftEnemies'),
        },
        rightEnemies: {
          type: SAKOFF,
          message: '',
          entities: generateEnemies(numRightEnemies, SAKOFF, 'rightEnemies'),
        },
      },
    };

    dispatch(startNewGameAction(newGameData));
  };

  return (
    <Window
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 200,
        padding: '1.5rem 0 0',
        zIndex: 10, // TODO: might be worth building a simple dialog controller for windows like this
      }}
    >
      <div>
        {gameState === GAME_WON
          ? 'You win! :)'
          : gameState === GAME_LOST
          ? 'You lose! :('
          : "Let's go!"}
      </div>
      <label htmlFor="numHeroes">Heroes: </label>
      <input
        type="number"
        id="numHeroes"
        name="numHeroes"
        value={numHeroes}
        onChange={(e: any) => {
          setNumHeroes(e.target.value);
        }}
        min="1"
        max="4"
      />
      <br />
      <label htmlFor="numLeftEnemies">Froggys: </label>
      <input
        type="number"
        id="numLeftEnemies"
        name="numLeftEnemies"
        value={numLeftEnemies}
        onChange={(e: any) => {
          setNumLeftEnemies(Number(e.target.value));
        }}
        min={numRightEnemies === 0 ? 1 : 0}
        max={numRightEnemies === 3 ? 1 : numRightEnemies === 2 ? 2 : 3}
      />
      <br />
      <label htmlFor="numRightEnemies">Sakoffs: </label>
      <input
        type="number"
        id="numRightEnemies"
        name="numRightEnemies"
        value={numRightEnemies}
        onChange={(e: any) => {
          setNumRightEnemies(Number(e.target.value));
        }}
        min={numLeftEnemies === 0 ? 1 : 0}
        max={numLeftEnemies === 3 ? 1 : numLeftEnemies === 2 ? 2 : 3}
      />
      <br />
      <Button
        onClick={startNewGame}
        disabled={numLeftEnemies + numRightEnemies <= 0}
      >
        Start Game
      </Button>
    </Window>
  );
};

export default NewGameMenu;
