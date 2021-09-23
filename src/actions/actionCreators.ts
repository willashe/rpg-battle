import { Dispatch } from 'react';
import {
  START_NEW_GAME,
  GAME_OVER,
  SET_MESSAGE,
  SET_STATUS,
  DAMAGE,
  SET_ACTIVE_HERO,
  SET_TARGET_TYPE,
  SET_TARGET,
  QUEUE_ACTION,
} from './actionTypes';
import { ActionType } from '../types';
import { EntityTypesEnum } from '../constants';

export const startNewGame = () => ({ type: START_NEW_GAME });
export const gameOver = () => ({ type: GAME_OVER });

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
export const setTargetType = (targetType: EntityTypesEnum) => ({
  type: SET_TARGET_TYPE,
  payload: targetType,
});
export const setTarget = (target: number | string) => ({
  type: SET_TARGET,
  payload: target,
});
export const queueAction = ({
  heroIndex,
  target,
  action,
}: {
  heroIndex: number;
  target: number | string;
  action: ActionType | any; // TODO
}) => ({
  type: QUEUE_ACTION,
  payload: {
    heroIndex,
    target,
    action,
  },
});

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const executeQueuedActionsThunk = async () => {
  console.log('execute!');
};

export const attackThunk =
  (targetGroup: string, targetIndex: number) =>
  async (dispatch: Dispatch<ActionType>) => {
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
      dispatch(setStatus(targetGroup, targetIndex, 'hurt'));
      await timeout(500);
      dispatch(setStatus(targetGroup, targetIndex, 'alive'));
      dispatch(
        damage(targetGroup, targetIndex, crit ? attackPower * 2 : attackPower)
      );
      if (crit) {
        dispatch(setMessage('idle'));
      }
    } else {
      dispatch(setMessage('missed!'));
      await timeout(1000);
      dispatch(setMessage('idle'));
    }
  };

export const deathThunk =
  (targetGroup: string, targetIndex: number) =>
  async (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatus(targetGroup, targetIndex, 'dying'));
    await timeout(1000);
    dispatch(setStatus(targetGroup, targetIndex, 'dead'));
  };
