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
  // incrementQueueIndex,
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

  /*

  useEffect(() => {
    // Create an scoped async function in the hook
    async function anyNameFunction() {
      await loadContent();
    }
    // Execute the created function directly
    anyNameFunction();
  }, []);

  queueIndex increments
  await async operations
    dispatch action
      animations
      update stats
*** KEY: need to update state here!!! ***
    check for deaths/endgame
  increment queueIndex



States:
INIT
GAME_WON
GAME_LOST
PLAYER_INPUT
EXECUTING_ACTION
AI_EXECUTING
POST_EXECUTION


state: 'INIT'
player hits "start"
dispatch action to set game state to PLAYER_INPUT (or go straight to AI_EXECUTING, chosen by enemy speed or something)
...user makes selections, dispatch actions that update queue/etc.
player hits "execute"
dispatch action to update game state to either AI_EXECUTING or increment queueIndex

useEffect: AI_EXECUTING
  ...loop over each enemy (by speed?) and select a target/action and execute
  dispatch action to increment queueIndex

useEffect: queueIndex increments
  dispatch action to set game state to EXECUTING_ACTION
    if no more actions in queue
      dispatch action to set queueIndex to null
      dispatch action to set game state to PLAYER_INPUT
    else
      ...perform necessary AI and dispatch actions/thunks for current queue action
      dispatch action to set game state to POST_EXECUTION

useEffect: POST_EXECUTION
  ...perform death/gameOver checks
  dispatch action to increment queueIndex


*/

  useEffect(() => {
    console.log('useEffect, queueIndex: ' + queueIndex);

    // user does something
    // dispatch action to update state immediately and kick off async stuff
    // trigger another action on resolution of async stuff

    // const executeAction = async (action: any) => {
    //   // this works because it returns a promise that resolves when the timeout executes
    //   // await timeout(1000);
    //   // figure out how to make this work
    //   // I believe "action" itself is a promise...
    //   await dispatch(action);
    //   console.log('action complete');
    //   // could also loop here and dispatch deathThunk...
    //   await dispatch(deathCycleThunk(enemies));
    //   console.log('death cycle complete');
    //   dispatch(incrementQueueIndex());
    // };

    if (queueIndex !== null) {
      if (queue[queueIndex]) {
        const { target, actionCreator } = queue[queueIndex];
        // TODO: randomize target selection from target group (only pass target group in queue object, no target index needed)

        let { group, index } = target;

        // console.log('****');
        // @ts-ignore
        // console.log(enemies[group]);
        // @ts-ignore
        // console.log(enemies[group][index]);
        // console.log(enemies[group === 'left' ? 'left' : 'right']); // TODO: wtf

        if (
          // @ts-ignore
          !enemies[group] ||
          // @ts-ignore
          !enemies[group][index] ||
          // @ts-ignore
          enemies[group][index].hp <= 0
        ) {
          // @ts-ignore
          index = enemies[group].findIndex(({ hp }) => hp > 0);
          if (index === -1) {
            group = group === 'left' ? 'right' : 'left';
            // @ts-ignore
            index = enemies[group].findIndex(({ hp }) => hp > 0);

            if (index === -1) {
              dispatch(gameOver());
            }
          }
        }

        dispatch(actionCreator({ group, index }));
        // console.log('execute action');
        // executeAction(actionCreator({ group, index }));
      } else {
        dispatch(setQueueIndex(null));
      }
    }
  }, [queueIndex, queue, dispatch]);

  useEffect(() => {
    console.log('useEffect, prevQueueIndex: ' + prevQueueIndex);

    dispatch(deathCycleThunk(enemies));
  }, [prevQueueIndex, dispatch]);

  const startNewGame = () => {
    const heroes = generateHeroes(4);
    const leftEnemies = generateEnemies(3, MONSTER);
    const rightEnemies = generateEnemies(3, ROBOT);
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
