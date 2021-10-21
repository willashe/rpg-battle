import { Dispatch } from 'react';
import {
  START_NEW_GAME,
  START_NEW_ROUND,
  GAME_WON,
  GAME_LOST,
  SET_QUEUE_INDEX,
  INCREMENT_QUEUE_INDEX,
  SET_GAME_STATE,
  SET_PLAYER_INTERRUPT,
  SET_ACTIVE_HERO,
  QUEUE_ACTION,
  SET_PLAYER_MESSAGE,
  SET_ENEMY_GROUP_MESSAGE,
  SET_ENTITY_STATUS,
  ENTITY_DAMAGE,
} from './actionTypes';
import {
  AppStateType,
  ActionType,
  TargetType,
  EntityActionType,
} from '../types';
import { GameStatesEnum, EntityTypesEnum } from '../constants';
const { EXECUTING, POST_EXECUTION } = GameStatesEnum;
const { HERO } = EntityTypesEnum;

export const startNewGame = (newGameState: AppStateType) => ({
  type: START_NEW_GAME,
  payload: newGameState,
});

export const startNewRound = (queue: EntityActionType[]) => ({
  type: START_NEW_ROUND,
  payload: queue,
});

export const gameWon = () => ({ type: GAME_WON });

export const gameLost = () => ({ type: GAME_LOST });

export const setQueueIndex = (index: number | null) => ({
  type: SET_QUEUE_INDEX,
  payload: index,
});

export const incrementQueueIndex = () => ({
  type: INCREMENT_QUEUE_INDEX,
});

export const setGameState = (state: string) => ({
  type: SET_GAME_STATE,
  payload: state,
});

export const setPlayerInterrupt = (interrupt: boolean) => ({
  type: SET_PLAYER_INTERRUPT,
  payload: interrupt,
});

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

export const setMessage = (message: string) => ({
  type: SET_PLAYER_MESSAGE,
  payload: message,
});

export const setEntityStatus = (
  targetGroup: string,
  targetIndex: number,
  status: string
) => ({
  type: SET_ENTITY_STATUS,
  payload: { targetGroup, targetIndex, status },
});

export const setEnemyGroupMessage = (
  targetGroup: string,
  message: string | number
) => ({
  type: SET_ENEMY_GROUP_MESSAGE,
  payload: { targetGroup, message },
});

export const entityDamage = (
  targetGroup: string,
  targetIndex: number,
  attackPower: number
) => ({
  type: ENTITY_DAMAGE,
  payload: { targetGroup, targetIndex, attackPower },
});

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const attackThunk =
  (actor: TargetType, target: TargetType) =>
  async (dispatch: Dispatch<ActionType>) => {
    const { group: actorGroup, index: actorIndex } = actor;
    const { group: targetGroup, index: targetIndex } = target;

    dispatch(setEntityStatus(actorGroup, actorIndex, 'acting'));
    await timeout(1000);
    dispatch(setEntityStatus(actorGroup, actorIndex, 'idle'));

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
        dispatch(setEnemyGroupMessage(targetGroup, attackPower));
      }
      dispatch(setEntityStatus(targetGroup, targetIndex, 'hurt'));
      await timeout(1000);
      if (actorGroup === HERO) {
        dispatch(setEnemyGroupMessage(targetGroup, ''));
      }
      dispatch(setEntityStatus(targetGroup, targetIndex, 'alive'));
      dispatch(
        entityDamage(
          targetGroup,
          targetIndex,
          crit ? attackPower * 2 : attackPower
        )
      );
      if (crit) {
        dispatch(setMessage(''));
      }
    } else {
      if (actorGroup === HERO) {
        dispatch(setEnemyGroupMessage(targetGroup, 'miss'));
      }
      await timeout(1000);
      if (actorGroup === HERO) {
        dispatch(setEnemyGroupMessage(targetGroup, ''));
      }
    }

    // need to dispatch this at the end of any queue action to progress the queue
    dispatch(setGameState(POST_EXECUTION));
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
        dispatch(setEntityStatus(HERO, index, 'dying'));
        await timeout(1000);
        dispatch(setEntityStatus(HERO, index, 'dead'));
      }
    }
    for (const [index, enemy] of left.entities.entries()) {
      const { status, hp } = enemy;

      if (hp > 0) {
        livingLeft++;
      }

      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(setEntityStatus('left', index, 'dying'));
        await timeout(1000);
        dispatch(setEntityStatus('left', index, 'dead'));
      }
    }
    for (const [index, enemy] of right.entities.entries()) {
      const { status, hp } = enemy;

      if (hp > 0) {
        livingRight++;
      }

      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(setEntityStatus('right', index, 'dying'));
        await timeout(1000);
        dispatch(setEntityStatus('right', index, 'dead'));
      }
    }

    if (!livingHeroes) {
      dispatch(gameLost());
    } else if (!livingLeft && !livingRight) {
      dispatch(gameWon());
    } else {
      dispatch(incrementQueueIndex());
      dispatch(setGameState(EXECUTING));
    }
  };
