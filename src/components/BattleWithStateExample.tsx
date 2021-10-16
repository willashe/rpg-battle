import { useContext, useEffect } from 'react';

import { AppStateContext } from '../state';
import { actionCreators } from '../actions';
import { EntityType } from '../types';
import { EntityTypesEnum } from '../constants';
import { generateHeroes, generateEnemies } from '../utils';
import Hero from './Hero';
import Enemy from './Enemy';
const { MONSTER, ROBOT } = EntityTypesEnum;

const {
  startNewGame: startNewGameAction,
  attackThunk,
  setActiveHero,
  queueAction,
  setQueueIndex,
  deathCycleThunk,
  gameOver,
} = actionCreators;

const Battle = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const {
    message,
    heroes,
    enemies,
    activeHero,
    queue,
    queueIndex,
    prevQueueIndex,
  } = state;

  useEffect(() => {
    console.log('useEffect, queueIndex: ' + queueIndex);

    // user does something
    // dispatch action to update state immediately and kick off async stuff
    // trigger another action on resolution of async stuff

    if (queueIndex !== null) {
      if (queue[queueIndex]) {
        const { target, actionCreator } = queue[queueIndex];
        // TODO: randomize target selection from target group (only pass target group in queue object, no target index needed)

        let { group, index } = target;

        if (
          !enemies[group] ||
          !enemies[group][index] ||
          enemies[group][index].hp <= 0
        ) {
          index = enemies[group].findIndex(({ hp }) => hp > 0);
          if (index === -1) {
            group = group === 'left' ? 'right' : 'left';
            index = enemies[group].findIndex(({ hp }) => hp > 0);

            if (index === -1) {
              dispatch(gameOver());
            }
          }
        }

        dispatch(actionCreator({ group, index }));
      } else {
        dispatch(setQueueIndex(null));
      }
    }
    // eslint-disable-next-line
  }, [queueIndex, queue, dispatch]);

  useEffect(() => {
    console.log('useEffect, prevQueueIndex: ' + prevQueueIndex);

    if (prevQueueIndex !== null) {
      dispatch(deathCycleThunk(enemies));
    }
    // eslint-disable-next-line
  }, [prevQueueIndex, dispatch]);

  const startNewGame = () => {
    const heroes = generateHeroes(4);
    const leftEnemies = generateEnemies(1, MONSTER);
    const rightEnemies = generateEnemies(1, ROBOT);
    const queue = heroes.map((hero: EntityType) => ({
      actionCreator: attackThunk,
      target: {
        group: 'left',
        index: 0,
      },
    }));

    // TODO: figure out where best to compose all this...
    const newGameData = {
      gameState: 'INIT',
      message: 'idle',
      heroes,
      enemies: { left: leftEnemies, right: rightEnemies },
      activeHero: null,
      queue,
      queueIndex: null,
      prevQueueIndex: null,
    };

    dispatch(startNewGameAction(newGameData));
  };

  return (
    <>
      <h1>Battle!</h1>

      <button onClick={startNewGame}>New Game</button>
      <br />

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
          disabled={queueIndex !== null}
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
                  dispatch(attackThunk({ group: 'left', index }))
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
                  dispatch(attackThunk({ group: 'right', index }))
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
