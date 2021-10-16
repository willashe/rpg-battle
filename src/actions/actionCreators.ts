import { Dispatch } from 'react';
import {
  START_NEW_GAME,
  GAME_OVER,
  SET_GAME_STATE,
  SET_MESSAGE,
  SET_STATUS,
  DAMAGE,
  SET_ACTIVE_HERO,
  QUEUE_ACTION,
  SET_QUEUE_INDEX,
  INCREMENT_QUEUE_INDEX,
  SET_PREV_QUEUE_INDEX,
  INCREMENT_PREV_QUEUE_INDEX,
} from './actionTypes';
import { AppStateType, ActionType, TargetType } from '../types';
import { GAME_STATES } from '../constants';
const { EXECUTING_ACTION, POST_EXECUTION } = GAME_STATES;

export const startNewGame = (newGameState: AppStateType) => ({
  type: START_NEW_GAME,
  payload: newGameState,
});
export const gameOver = () => ({ type: GAME_OVER });

export const setGameState = (state: string) => ({
  type: SET_GAME_STATE,
  payload: state,
});

export const setMessage = (message: string) => ({
  type: SET_MESSAGE,
  payload: message,
});
export const setStatus = (
  targetGroup: string,
  targetIndex: number,
  status: string
) => ({
  type: SET_STATUS,
  payload: { targetGroup, targetIndex, status },
});
export const damage = (
  targetGroup: string,
  targetIndex: number,
  attackPower: number
) => ({ type: DAMAGE, payload: { targetGroup, targetIndex, attackPower } });

export const setActiveHero = (activeIndex: number) => ({
  type: SET_ACTIVE_HERO,
  payload: activeIndex,
});
export const queueAction = ({
  heroIndex,
  target,
  actionCreator,
}: {
  heroIndex: number;
  target: TargetType;
  actionCreator: any; // TODO
}) => ({
  type: QUEUE_ACTION,
  payload: {
    heroIndex,
    target,
    actionCreator,
  },
});
export const setQueueIndex = (index: number | null) => ({
  type: SET_QUEUE_INDEX,
  payload: index,
});
export const setPrevQueueIndex = (index: number | null) => ({
  type: SET_PREV_QUEUE_INDEX,
  payload: index,
});
export const incrementQueueIndex = () => ({
  type: INCREMENT_QUEUE_INDEX,
});
export const incrementPrevQueueIndex = () => ({
  type: INCREMENT_PREV_QUEUE_INDEX,
});

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const executeQueuedActionsThunk = async () => {
  console.log('execute!');
};

export const attackThunk =
  (target: TargetType) => async (dispatch: Dispatch<ActionType>) => {
    const { group, index } = target;

    dispatch(setMessage('attacking...'));
    await timeout(1000);
    dispatch(setMessage('idle'));

    const attackPower = Math.floor(Math.random() * 5);
    let crit = false;
    if (Math.random() > 0.85) {
      crit = true;
    }

    if (attackPower > 0) {
      if (crit) {
        dispatch(setMessage('terrific blow!!!'));
      }
      dispatch(setStatus(group, index, 'hurt'));
      await timeout(500);
      dispatch(setStatus(group, index, 'alive'));
      dispatch(damage(group, index, crit ? attackPower * 2 : attackPower));
      if (crit) {
        dispatch(setMessage('idle'));
      }
    } else {
      dispatch(setMessage('missed!'));
      await timeout(1000);
      dispatch(setMessage('idle'));
    }

    // need to dispatch this at the end of any queue action to progress the queue
    dispatch(incrementPrevQueueIndex());
  };

// export const deathThunk =
//   (targetGroup: string, targetIndex: number) =>
//   async (dispatch: Dispatch<ActionType>) => {
//     dispatch(setStatus(targetGroup, targetIndex, 'dying'));
//     await timeout(1000);
//     dispatch(setStatus(targetGroup, targetIndex, 'dead'));
//   };

// TODO
export const deathCycleThunk =
  (enemies: any) => async (dispatch: Dispatch<ActionType>) => {
    const { left, right } = enemies;

    let livingLeft = 0;
    let livingRight = 0;

    for (const [index, enemy] of left.entries()) {
      const { status, hp } = enemy;

      if (hp >= 0) {
        livingLeft++;
      }

      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(setStatus('left', index, 'dying'));
        await timeout(1000);
        dispatch(setStatus('left', index, 'dead'));
      }
    }
    for (const [index, enemy] of right.entries()) {
      const { status, hp } = enemy;

      if (hp >= 0) {
        livingRight++;
      }

      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(setStatus('right', index, 'dying'));
        await timeout(1000);
        dispatch(setStatus('right', index, 'dead'));
      }
    }

    if (!livingLeft && !livingRight) {
      console.log(livingLeft);
      console.log(livingRight);
      console.log('game over');
      dispatch(gameOver());
    } else {
      dispatch(incrementQueueIndex());
    }
  };

export const executeThunk = () => async (dispatch: Dispatch<ActionType>) => {
  dispatch(setMessage('doing stuff...'));
  await timeout(1000);
  dispatch(setMessage('idle'));
  dispatch(setGameState(POST_EXECUTION));
};

export const postExecuteThunk =
  () => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setMessage('doing post-execution stuff...'));
    await timeout(1000);
    dispatch(setMessage('idle'));
    dispatch(setGameState(EXECUTING_ACTION));
    dispatch(incrementQueueIndex());
  };

export const testThunk = () => async (dispatch: Dispatch<ActionType>) => {
  dispatch(setGameState('thunk stuff...'));
  await timeout(1000);
  dispatch(setGameState('idle'));
};
