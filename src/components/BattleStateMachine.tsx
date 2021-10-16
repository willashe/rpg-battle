// @ts-nocheck
import { useContext, useEffect } from 'react';

import { AppStateContext } from '../state';
import { actionCreators } from '../actions';
import { GAME_STATES } from '../constants';
const {
  INIT,
  GAME_WON,
  GAME_LOST,
  PLAYER_INPUT,
  EXECUTING_ACTION,
  AI_EXECUTING,
  POST_EXECUTION,
} = GAME_STATES;

/*


-- queue or purely speed-based actor selection???
  -- or maybe generate a new queue each round?
-- does PS2 just keep going until user interrupts?


*** SPLIT ENTITY ANIMATION AND STATUS STATE ***

{
  heroes: [ { name: 'Rolf', hp: 10 }, ...],
  heroAnimations: [ 'attacking', 'hidden', 'hidden', 'hidden'],
  enemies: [...],
  enemyAnimations: [...],
}

- maybe assign actions/targets to entities themselves instead of a queue
  - can be a single object or array of objects (multiple attacks)
    - target can be a single object or array of objects (group attacks)
- each "round" select an actor entity (by speed?) and then check it for whatever action/target it has queued

useEffect(() => {
  if (queueIndex !== null) {
    if (queue[queueIndex]) {
      // perform targeting logic, etc.
      dispatch(attackThunk(target, damage)) // or a different thunk according to the queue action being executed
    } else {
      dispatch(setQueueIndex(null))
    }
  } else {
    // start enemyAI?
  }
}, [queueIndex, dispatch]);
-- OR --
useEffect(() => {
  if (round !== null) {
    // perform actor selection logic here
    // check for player interrupt
    // perform targeting logic, etc.
    dispatch(attackThunk(target, damage)) // or a different thunk according to the queue action being executed
  }
}, [round, dispatch]);

useEffect(() => {
  dispatch(heroStatusCheckThunk(heroes))
}, [heroes, dispatch]);

useEffect(() => {
  dispatch(enemyStatusCheckThunk(enemies))
}, [enemies, dispatch]);


attackThunk = async (target, damage) => {
  // execute actor/target async animations + messaging
  wait
  // execute actor/target async animation reset + messaging
  if (Array.isArray(target)) {
    for (target...) {
      // execute target animations + messaging
    }
    wait
    // execute status state updates
  } else {
    // execute target animations + messaging
    wait
    // execute status state updates
  }
}

heroStatusCheckThunk = async (heroes) => {
  const livingHeroes = 0;
  for (living heroes...) {
    // check health, trigger death animation
  }
  wait
  for (living heroes...) {
    // check if living, finish death animation
    livingHeroes++
  }
  
  if (!livingHeroes) {
    dispatch(gameLost())
  } else {
    dispatch(incrementQueueIndex())
    -- OR --
    dispatch(incrementRound())
  }
}

enemyStatusCheckThunk = async (enemies) => {
  const allEnemies = [...enemies.left, ...enemies.right]
  const livingEnemies = 0;

  for (living allEnemies...) {
    // check health, trigger death animation
  }
  wait
  for (living allEnemies...) {
    // check if living, finish death animation
    livingEnemies++
  }
  
  if (!livingEnemies) {
    dispatch(gameWon())
  } else {
    dispatch(incrementQueueIndex())
    -- OR --
    dispatch(incrementRound())
  }
}







EXECUTE_ACTION / INCREMENT_QUEUE_INDEX
  useEffect reacts to gameState = EXECUTE_ACTION / queueIndex change
  execute async animations on actor entity
  execute state updates on targeted entities

useEffect reacts to changes in entity status state
  loop over entities
    execute async animations
    execute state updates
  





EXECUTE_ACTION / INCREMENT_QUEUE_INDEX
  useEffect reacts to gameState = EXECUTE_ACTION / queueIndex change
  execute async animations and state updates
  when complete, update gameState to STATUS_CHECK
STATUS_CHECK
  useEffect reacts to gameState = STATUS_CHECK
  loop over entities
    execute async animations and state updates
  when complete, update gameState to GAMEOVER_CHECK
GAMEOVER_CHECK
  useEffect reacts to gameState = STATUS_CHECK

dispatch action
start animation
wait
stop animation
update state
--- useEffect
check to see if any updated entities need to trigger animations
  if so
    start animation
    wait
    end animation
    update state
    repeat
check to see if game is won/lost

*/

const {
  setGameState,
  incrementQueueIndex,
  setQueueIndex,
  executeThunk,
  postExecuteThunk,
  testThunk,
} = actionCreators;

const Battle = () => {
  const [state, dispatch] = useContext(AppStateContext);
  const { gameState, queueIndex, message } = state;

  const queue = [1, 2, 3, 4];
  console.log('render Battle');

  // useEffect(() => {
  //   console.log(`useEffect: ${gameState}`);
  // }, [gameState]);

  useEffect(() => {
    console.log(gameState);
    switch (gameState) {
      case EXECUTING_ACTION: {
        console.log('useEffect: EXECUTING_ACTION');
        // ...
        break;
      }
      case AI_EXECUTING: {
        console.log('useEffect: AI_EXECUTING');
        // ...
        break;
      }
      case POST_EXECUTION: {
        console.log('useEffect: POST_EXECUTION');
        dispatch(postExecuteThunk());
        break;
      }
      default: {
        // IDLE?
      }
    }
  }, [gameState, dispatch]);

  useEffect(() => {
    if (gameState === EXECUTING_ACTION && queueIndex !== null) {
      console.log(`useEffect: queueIndex ${queueIndex}`);

      if (queue[queueIndex]) {
        dispatch(executeThunk());
      } else {
        dispatch(setGameState(AI_EXECUTING));
        dispatch(setQueueIndex(null));
      }
    }
  }, [gameState, queueIndex, dispatch]);

  return (
    <>
      <h1>Battle</h1>

      <h2>{gameState}</h2>
      <h2>{queueIndex !== null ? queueIndex : 'null'}</h2>
      <h2>{message}</h2>

      {/* <button
        onClick={() => {
          dispatch(setGameState(INIT));
          dispatch(setGameState(PLAYER_INPUT));
          dispatch(testThunk());
        }}
      >
        TEST
      </button> */}

      {gameState === INIT && (
        <div>
          <button onClick={() => dispatch(setGameState(PLAYER_INPUT))}>
            Start (PLAYER_INPUT)
          </button>
          <button onClick={() => dispatch(setGameState(AI_EXECUTING))}>
            Start (AI_EXECUTING)
          </button>
        </div>
      )}

      {gameState === PLAYER_INPUT && (
        <div>
          <button onClick={() => dispatch(incrementQueueIndex())}>
            INCREMENT_QUEUE_INDEX
          </button>
          <button onClick={() => dispatch(setGameState(EXECUTING_ACTION))}>
            EXECUTING_ACTION
          </button>
        </div>
      )}
    </>
  );
};

export default Battle;

/*

state: 'INIT'
player hits "start"
dispatch action to set game state to PLAYER_INPUT (or go straight to AI_EXECUTING, chosen by enemy speed or something)

if PLAYER_INPUT render menu UI
...user makes selections, dispatch actions that update queue/etc.
player hits "execute"
dispatch action to update game state to either EXECUTING_ACTION or increment queueIndex

useEffect: queueIndex increments
  dispatch action to set game state to EXECUTING_ACTION
    if no more actions in queue
      dispatch action to set queueIndex to null
      dispatch action to set game state to PLAYER_INPUT
    else
      ...perform necessary AI and dispatch actions/thunks for current queue action
      dispatch action to set game state to POST_EXECUTION

useEffect: AI_EXECUTING
  ...loop over each enemy (by speed?) and select a target/action and execute
  dispatch action to increment queueIndex

useEffect: POST_EXECUTION
  ...perform death/gameOver checks
  dispatch action to increment queueIndex

*/
