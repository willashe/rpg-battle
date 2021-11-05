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
  SET_GROUP_MESSAGE,
  SET_ENTITY_STATUS,
  ENTITY_DAMAGE,
} from './actionTypes';
import {
  AppStateType,
  EntityGroupType,
  ActionType,
  TargetType,
  EntityActionType,
} from '../types';
import { EntityActionTypesEnum, GameStatesEnum } from '../constants';
const { EXECUTING, POST_EXECUTION } = GameStatesEnum;

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
  type,
}: {
  heroIndex: number;
  target: TargetType;
  actionCreator: any; // TODO
  type: EntityActionTypesEnum;
}) => ({
  type: QUEUE_ACTION,
  payload: {
    heroIndex,
    target,
    actionCreator,
    type,
  },
});

export const setGroupMessage = ({
  target,
  message,
}: {
  target: TargetType;
  message: string | number;
}) => ({
  type: SET_GROUP_MESSAGE,
  payload: { target, message },
});

export const setEntityStatus = (
  target: TargetType,
  status: string,
  position?: any
) => ({
  type: SET_ENTITY_STATUS,
  payload: { target, status, position },
});

export const entityDamage = (target: TargetType, attackPower: number) => ({
  type: ENTITY_DAMAGE,
  payload: { target, attackPower },
});

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO: maybe pass in full actor/target objects, then we can use attributes and equipped weapons/armor to determine damage dealt, likelihood of missing, targeting behavior, number of attacks, etc.
// if no index passed, would we then need an array of full group entity objects?
export const attackThunk =
  (actor: TargetType, target: TargetType) =>
  async (dispatch: Dispatch<ActionType>) => {
    const { group: actorGroup } = actor;

    dispatch(setEntityStatus(target, 'targeted'));
    dispatch(
      setEntityStatus(
        actor,
        'attacking',
        target.xPosition
          ? {
              top: 64,
              left: target.xPosition,
            }
          : undefined
      )
    );
    await timeout(1000);
    dispatch(setEntityStatus(actor, 'idle'));

    // TODO: use full objects for actor and target/s to determine who gets hit and for how much
    // TODO: loop over target group if array
    const attackPower = Math.floor(Math.random() * 5);
    let crit = false;
    if (Math.random() > 0.85) {
      crit = true;
    }

    if (attackPower > 0) {
      if (crit) {
        dispatch(
          setGroupMessage({
            target: { group: 'player' },
            message: 'terrific blow!!!',
          })
        );
      }
      if (actorGroup === 'player') {
        dispatch(
          setGroupMessage({
            target,
            message: attackPower,
          })
        );
      }
      dispatch(setEntityStatus(target, 'hurt'));
      await timeout(1000);
      if (actorGroup === 'player') {
        dispatch(
          setGroupMessage({
            target,
            message: '',
          })
        );
      }
      dispatch(entityDamage(target, crit ? attackPower * 2 : attackPower));
      if (crit) {
        dispatch(
          setGroupMessage({
            target: { group: 'player' },
            message: '',
          })
        );
      }
    } else {
      if (actorGroup === 'player') {
        dispatch(
          setGroupMessage({
            target,
            message: 'miss',
          })
        );
      }
      await timeout(1000);
      if (actorGroup === 'player') {
        dispatch(
          setGroupMessage({
            target,
            message: '',
          })
        );
      }
    }
    dispatch(setEntityStatus(target, 'idle'));

    // need to dispatch this at the end of any queue action to progress the queue
    dispatch(setGameState(POST_EXECUTION));
  };

export const postExecutionThunk =
  (
    heroes: EntityGroupType,
    leftEnemies: EntityGroupType,
    rightEnemies: EntityGroupType
  ) =>
  async (dispatch: Dispatch<ActionType>) => {
    let livingHeroes = 0;
    let livingLeft = 0;
    let livingRight = 0;

    for (const [index, hero] of heroes.entities.entries()) {
      const { status, hp } = hero;

      if (hp > 0) {
        livingHeroes++;
      }

      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(setEntityStatus({ group: 'player', index }, 'dying'));
        await timeout(1000);
        dispatch(setEntityStatus({ group: 'player', index }, 'dead'));
      }
    }
    for (const [index, enemy] of leftEnemies.entities.entries()) {
      const { status, hp } = enemy;

      if (hp > 0) {
        livingLeft++;
      }

      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(setEntityStatus({ group: 'leftEnemies', index }, 'dying'));
        await timeout(1000);
        dispatch(setEntityStatus({ group: 'leftEnemies', index }, 'dead'));
      }
    }
    for (const [index, enemy] of rightEnemies.entities.entries()) {
      const { status, hp } = enemy;

      if (hp > 0) {
        livingRight++;
      }

      if (status !== 'dying' && status !== 'dead' && hp <= 0) {
        dispatch(setEntityStatus({ group: 'rightEnemies', index }, 'dying'));
        await timeout(1000);
        dispatch(setEntityStatus({ group: 'rightEnemies', index }, 'dead'));
      }
    }

    await timeout(500);

    if (!livingHeroes) {
      dispatch(gameLost());
    } else if (!livingLeft && !livingRight) {
      dispatch(gameWon());
    } else {
      dispatch(incrementQueueIndex());
      dispatch(setGameState(EXECUTING));
    }
  };
