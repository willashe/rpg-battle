import { useContext, useEffect, useState } from 'react';

import { AppStateContext } from '../state';
import { actionCreators } from '../actions';
import { EntityType } from '../types';
import { EntityTypesEnum, GameStatesEnum } from '../constants';
import { generateHeroes, generateEnemies } from '../utils';
import Hero from './Hero';
import Enemy from './Enemy';
const { HERO, MONSTER, ROBOT } = EntityTypesEnum;
const { INIT, EXECUTING, PLAYER_INPUT, GAME_WON, GAME_LOST } = GameStatesEnum;

const {
  startNewGame: startNewGameAction,
  attackThunk,
  setActiveHero,
  queueAction,
  setQueueIndex,
  incrementQueueIndex,
  deathCycleThunk,
  gameWon,
  gameLost,
  setGameState,
} = actionCreators;

const Battle = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const {
    gameState,
    message,
    heroes,
    enemies,
    activeHero,
    queue,
    queueIndex,
    prevQueueIndex,
  } = state;
  const [numHeroes, setNumHeroes] = useState(1);
  const [numLeftEnemies, setNumLeftEnemies] = useState(1);
  const [numRightEnemies, setNumRightEnemies] = useState(1);

  useEffect(() => {
    console.log('useEffect, queueIndex: ' + queueIndex);
    console.log(queue);

    if (queueIndex !== null) {
      if (queue[queueIndex]) {
        console.log(queue[queueIndex]);
        const { actor, target, actionCreator } = queue[queueIndex];
        // TODO: randomize target selection from target group (only pass target group in queue object, no target index needed)

        if (queueIndex === 0) {
          dispatch(setGameState(EXECUTING));
        }

        let { group: targetGroup, index: targetIndex } = target;

        // TODO: clean this code up
        if (
          (actor.group === HERO && heroes[actor.index].hp <= 0) ||
          (actor.group !== HERO &&
            enemies[actor.group] &&
            enemies[actor.group][actor.index] &&
            enemies[actor.group][actor.index].hp <= 0)
        ) {
          dispatch(incrementQueueIndex());
          return;
        }

        if (targetGroup === HERO) {
          if (!heroes[targetIndex] || heroes[targetIndex].hp <= 0) {
            targetIndex = heroes.findIndex(({ hp }) => hp > 0);

            if (targetIndex === -1) {
              dispatch(gameLost());
              return;
            }
          }
        } else if (
          !enemies[targetGroup] ||
          !enemies[targetGroup][targetIndex] ||
          enemies[targetGroup][targetIndex].hp <= 0
        ) {
          targetIndex = enemies[targetGroup].findIndex(({ hp }) => hp > 0);
          if (targetIndex === -1) {
            targetGroup = targetGroup === 'left' ? 'right' : 'left';
            targetIndex = enemies[targetGroup].findIndex(({ hp }) => hp > 0);

            if (targetIndex === -1) {
              dispatch(gameWon());
              return;
            }
          }
        }

        dispatch(
          actionCreator(actor, { group: targetGroup, index: targetIndex })
        );
      } else {
        dispatch(setGameState(PLAYER_INPUT));
        dispatch(setQueueIndex(null));
      }
    }
    // eslint-disable-next-line
  }, [queueIndex, queue, dispatch]);

  useEffect(() => {
    console.log('useEffect, prevQueueIndex: ' + prevQueueIndex);

    // TODO: instead of passing enemies here, try using state directly in the thunk (it's being passed now)
    if (prevQueueIndex !== null) {
      dispatch(deathCycleThunk(heroes, enemies));
    }
    // eslint-disable-next-line
  }, [prevQueueIndex, dispatch]);

  const startNewGame = () => {
    const newHeroes = generateHeroes(numHeroes);
    const leftEnemies = generateEnemies(numLeftEnemies, MONSTER);
    const rightEnemies = generateEnemies(numRightEnemies, ROBOT);

    // TODO: clean up all this code duplication
    const heroActionQueue = newHeroes.map((entity: EntityType, index) => ({
      actionCreator: attackThunk,
      actor: {
        group: HERO,
        index,
      },
      target: {
        group: 'left',
        index: 0,
      },
    }));

    const leftEnemyActionQueue = leftEnemies.map(
      (entity: EntityType, index) => ({
        actionCreator: attackThunk,
        actor: {
          group: 'left',
          index,
        },
        target: {
          group: HERO,
          index: 0,
        },
      })
    );

    const rightEnemyActionQueue = rightEnemies.map(
      (entity: EntityType, index) => ({
        actionCreator: attackThunk,
        actor: {
          group: 'right',
          index,
        },
        target: {
          group: HERO,
          index: 0,
        },
      })
    );

    const queue = [
      ...heroActionQueue,
      ...leftEnemyActionQueue,
      ...rightEnemyActionQueue,
    ];

    // TODO: figure out where best to compose all this...
    const newGameData = {
      gameState: INIT,
      message: 'idle',
      heroes: newHeroes,
      enemies: { left: leftEnemies, right: rightEnemies },
      activeHero: null,
      queue,
      queueIndex: null,
      prevQueueIndex: null,
    };

    // TODO: preemptive attack chance
    dispatch(startNewGameAction(newGameData));
  };

  return (
    <>
      <h1>Battle!</h1>

      <div>
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
          disabled={
            numLeftEnemies + numRightEnemies <= 0 || gameState === EXECUTING
          }
        />
        <label htmlFor="numLeftEnemies">Left Enemy Group: </label>
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
          disabled={
            numLeftEnemies + numRightEnemies <= 0 || gameState === EXECUTING
          }
        />
        <label htmlFor="numRightEnemies">Right Enemy Group: </label>
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
          disabled={
            numLeftEnemies + numRightEnemies <= 0 || gameState === EXECUTING
          }
        />

        <button
          onClick={startNewGame}
          disabled={
            numLeftEnemies + numRightEnemies <= 0 || gameState === EXECUTING
          }
        >
          New Game
        </button>
      </div>

      <div>Game State: {gameState}</div>

      <h3>{message}</h3>

      <div style={{ display: 'flex' }}>
        {Boolean(heroes.length) && (
          <>
            {heroes.map((data: EntityType, index) => (
              <Hero
                key={index}
                index={index}
                active={activeHero === index}
                handleClick={() => dispatch(setActiveHero(index))}
                {...data}
              />
            ))}
          </>
        )}
      </div>

      {activeHero !== null && (
        <>
          <button
            onClick={() =>
              dispatch(
                queueAction({
                  heroIndex: activeHero,
                  target: { group: 'left', index: 0 },
                  actionCreator: attackThunk,
                })
              )
            }
          >
            Left
          </button>
          <button
            onClick={() =>
              dispatch(
                queueAction({
                  heroIndex: activeHero,
                  target: { group: 'right', index: 0 },
                  actionCreator: attackThunk,
                })
              )
            }
          >
            Right
          </button>
        </>
      )}

      {Boolean(queue.length) && (
        <button
          disabled={
            queueIndex !== null ||
            gameState === GAME_WON ||
            gameState === GAME_LOST
          }
          onClick={() => dispatch(setQueueIndex(0))}
        >
          Execute!
        </button>
      )}

      <div style={{ display: 'flex' }}>
        {Boolean(enemies.left.length) && (
          <>
            {enemies.left.map((data: EntityType, index) => (
              <Enemy
                key={index}
                index={index}
                handleClick={() =>
                  dispatch(
                    attackThunk(
                      { group: HERO, index },
                      { group: 'left', index }
                    )
                  )
                }
                {...data}
              />
            ))}
          </>
        )}
        {Boolean(enemies.right.length) && (
          <>
            {enemies.right.map((data: EntityType, index) => (
              <Enemy
                key={index}
                index={index}
                handleClick={() =>
                  dispatch(
                    attackThunk(
                      { group: HERO, index },
                      { group: 'right', index }
                    )
                  )
                }
                {...data}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Battle;
