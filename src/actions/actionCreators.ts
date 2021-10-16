import { Dispatch } from 'react';
import {
  START_NEW_GAME,
  GAME_OVER,
  GAME_WON,
  GAME_LOST,
  SET_GAME_STATE,
  SET_MESSAGE,
  SET_ENEMY_MESSAGE,
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
import { GameStatesEnum, EntityTypesEnum } from '../constants';
const { EXECUTING_ACTION, POST_EXECUTION } = GameStatesEnum;
const { HERO } = EntityTypesEnum;

export const startNewGame = (newGameState: AppStateType) => ({
  type: START_NEW_GAME,
  payload: newGameState,
});
export const gameOver = () => ({ type: GAME_OVER });
export const gameWon = () => ({ type: GAME_WON });
export const gameLost = () => ({ type: GAME_LOST });

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
export const setEnemyMessage = (
  targetGroup: string,
  message: string | number
) => ({
  type: SET_ENEMY_MESSAGE,
  payload: { targetGroup, message },
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
  (actor: TargetType, target: TargetType) =>
  async (dispatch: Dispatch<ActionType>) => {
    const { group: actorGroup, index: actorIndex } = actor;
    const { group: targetGroup, index: targetIndex } = target;

    dispatch(setMessage('attacking...'));
    dispatch(setStatus(actorGroup, actorIndex, 'acting'));
    await timeout(1000);
    dispatch(setMessage('idle'));
    dispatch(setStatus(actorGroup, actorIndex, 'idle'));

    // const attackPower = Math.ceil(Math.random() * 10);
    const attackPower = Math.floor(Math.random() * 5);
    let crit = false;
    if (Math.random() > 0.85) {
      crit = true;
    }

    if (attackPower > 0) {
      if (crit) {
        dispatch(setMessage('terrific blow!!!'));
      }
      if (actorGroup === HERO) {
        dispatch(setEnemyMessage(targetGroup, attackPower));
      }
      dispatch(setStatus(targetGroup, targetIndex, 'hurt'));
      await timeout(1000);
      if (actorGroup === HERO) {
        dispatch(setEnemyMessage(targetGroup, ''));
      }
      dispatch(setStatus(targetGroup, targetIndex, 'alive'));
      dispatch(
        damage(targetGroup, targetIndex, crit ? attackPower * 2 : attackPower)
      );
      if (crit) {
        dispatch(setMessage('idle'));
      }
    } else {
      if (actorGroup === HERO) {
        dispatch(setEnemyMessage(targetGroup, 'miss'));
      }
      dispatch(setMessage('missed!'));
      await timeout(1000);
      if (actorGroup === HERO) {
        dispatch(setEnemyMessage(targetGroup, ''));
      }
      dispatch(setMessage('idle'));
    }

    // need to dispatch this at the end of any queue action to progress the queue
    dispatch(incrementPrevQueueIndex());
  };

// TODO: ts
export const deathCycleThunk =
  (heroes: any, enemies: any) => async (dispatch: Dispatch<ActionType>) => {
    const { left, right } = enemies;

    let livingHeroes = 0;
    let livingLeft = 0;
    let livingRight = 0;

    for (const [index, hero] of heroes.entries()) {
      const { status, hp } = hero;

      if (hp > 0) {
        livingHeroes++;
      }

      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(setStatus(HERO, index, 'dying'));
        await timeout(1000);
        dispatch(setStatus(HERO, index, 'dead'));
      }
    }
    for (const [index, enemy] of left.entities.entries()) {
      const { status, hp } = enemy;

      if (hp > 0) {
        livingLeft++;
      }

      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(setStatus('left', index, 'dying'));
        await timeout(1000);
        dispatch(setStatus('left', index, 'dead'));
      }
    }
    for (const [index, enemy] of right.entities.entries()) {
      const { status, hp } = enemy;

      if (hp > 0) {
        livingRight++;
      }

      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(setStatus('right', index, 'dying'));
        await timeout(1000);
        dispatch(setStatus('right', index, 'dead'));
      }
    }

    if (!livingHeroes) {
      dispatch(gameLost());
    } else if (!livingLeft && !livingRight) {
      dispatch(gameWon());
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
