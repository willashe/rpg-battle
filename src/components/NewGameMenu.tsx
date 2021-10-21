import { useContext, useState } from 'react';
import styled from 'styled-components';

import { AppStateContext } from '../state';
import { actionCreators } from '../actions';
import { EntityTypesEnum, GameStatesEnum } from '../constants';
import { generateHeroes, generateEnemies } from '../utils';
import Window from './Window';

const { HERO, MONSTER, ROBOT } = EntityTypesEnum;
const { NEW_GAME, GAME_WON, GAME_LOST } = GameStatesEnum;
const { startNewGame: startNewGameAction, attackThunk } = actionCreators;

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
    // TODO: abstract building of queuedActions into reusable util function (check equipped weapons)
    const newHeroes = generateHeroes(numHeroes).map((hero, index) => ({
      ...hero,
      queuedActions: [
        {
          actionCreator: attackThunk,
          actor: { group: HERO, index },
          target: { group: 'left', index: 0 },
        },
      ],
    }));
    const leftEnemies = generateEnemies(numLeftEnemies, MONSTER).map(
      (enemy, index) => ({
        ...enemy,
        queuedActions: [
          {
            actionCreator: attackThunk,
            actor: { group: 'left', index },
            target: { group: HERO, index: 0 },
          },
        ],
      })
    );
    const rightEnemies = generateEnemies(numRightEnemies, ROBOT).map(
      (enemy, index) => ({
        ...enemy,
        queuedActions: [
          {
            actionCreator: attackThunk,
            actor: { group: 'right', index },
            target: { group: HERO, index: 0 },
          },
        ],
      })
    );

    // TODO: figure out where best to compose all this...
    const newGameData = {
      gameState: NEW_GAME,
      message: '',
      heroes: newHeroes,
      enemies: {
        left: { name: 'Monster', message: '', entities: leftEnemies },
        right: { name: 'Robot', message: '', entities: rightEnemies },
      },
      activeHero: null,
      queue: [],
      queueIndex: null,
      playerInterrupt: false,
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
        height: 150,
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
        max="10"
      />
      <label htmlFor="numLeftEnemies">Monsters: </label>
      <input
        type="number"
        id="numLeftEnemies"
        name="numLeftEnemies"
        value={numLeftEnemies}
        onChange={(e: any) => {
          setNumLeftEnemies(e.target.value);
        }}
        min="0"
        max="10"
      />
      <label htmlFor="numRightEnemies">Robots: </label>
      <input
        type="number"
        id="numRightEnemies"
        name="numRightEnemies"
        value={numRightEnemies}
        onChange={(e: any) => {
          setNumRightEnemies(e.target.value);
        }}
        min="0"
        max="10"
      />
      <br />
      <Button
        onClick={startNewGame}
        disabled={numLeftEnemies + numRightEnemies <= 0}
      >
        New Game
      </Button>
    </Window>
  );
};

export default NewGameMenu;
