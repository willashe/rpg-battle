import { Dispatch } from 'react';
import {
  START_NEW_GAME,
  START_NEW_ROUND,
  WIN_GAME,
  LOSE_GAME,
  SET_QUEUE_INDEX,
  INCREMENT_QUEUE_INDEX,
  SET_GAME_STATE,
  SET_PLAYER_INTERRUPT,
  SET_ACTIVE_HERO,
  QUEUE_ACTION,
  SET_GROUP_MESSAGE,
  SET_ENTITY_ANIMATION,
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
import {
  EXECUTING,
  POST_EXECUTION,
  EntityActionTypesEnum,
  AnimationTypesEnum,
  TARGETED,
  IDLE,
  HURT,
  EntityStatusesEnum,
  DYING,
  DEAD,
  OK,
  PLAYER_GROUP,
  RIGHT_ENEMY_GROUP,
  LEFT_ENEMY_GROUP,
} from '../constants';

export const startNewGame = (newGameState: AppStateType) => ({
  type: START_NEW_GAME,
  payload: newGameState,
});

export const startNewRound = (queue: EntityActionType[]) => ({
  type: START_NEW_ROUND,
  payload: queue,
});

export const winGame = () => ({ type: WIN_GAME });

export const loseGame = () => ({ type: LOSE_GAME });

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
  type,
}: {
  heroIndex: number;
  target: TargetType;
  type: EntityActionTypesEnum;
}) => ({
  type: QUEUE_ACTION,
  payload: {
    heroIndex,
    target,
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
  status: EntityStatusesEnum
) => ({
  type: SET_ENTITY_STATUS,
  payload: { target, status },
});

export const setEntityAnimation = (
  target: TargetType,
  animation:
    | AnimationTypesEnum
    | {
        type: AnimationTypesEnum;
        left?: number | string;
      }
) => ({
  type: SET_ENTITY_ANIMATION,
  payload: { target, animation },
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
  (
    actor: TargetType,
    target: TargetType,
    mainAnimationData: {
      type: AnimationTypesEnum;
      duration: number;
      left?: number | string;
    }
  ) =>
  async (dispatch: Dispatch<ActionType>) => {
    const { group: actorGroup } = actor;
    // TODO: something off about this implementation, the only reason we need to pass duration here is to use it in the first animation timeout...
    const { duration } = mainAnimationData;

    dispatch(setEntityAnimation(actor, mainAnimationData));
    dispatch(
      setEntityAnimation(target, {
        type: TARGETED,
        left: target.group === PLAYER_GROUP ? actor.leftPosition : undefined,
      })
    );
    await timeout(duration);
    dispatch(setEntityAnimation(actor, IDLE));

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
            target: { group: PLAYER_GROUP },
            message: 'terrific blow!!!',
          })
        );
      }
      if (actorGroup === PLAYER_GROUP) {
        dispatch(
          setGroupMessage({
            target,
            message: attackPower,
          })
        );
      }
      dispatch(
        setEntityAnimation(target, {
          type: HURT,
          left: target.group === PLAYER_GROUP ? actor.leftPosition : undefined,
        })
      );
      await timeout(1000);
      if (actorGroup === PLAYER_GROUP) {
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
            target: { group: PLAYER_GROUP },
            message: '',
          })
        );
      }
      dispatch(setEntityAnimation(target, { type: IDLE, left: -1 }));
    } else {
      if (actorGroup === PLAYER_GROUP) {
        dispatch(
          setGroupMessage({
            target,
            message: 'miss',
          })
        );
      }
      await timeout(1000);
      if (actorGroup === PLAYER_GROUP) {
        dispatch(
          setGroupMessage({
            target,
            message: '',
          })
        );
      }
      dispatch(setEntityAnimation(target, IDLE));
    }

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
      const { status, currentAnimation, hp } = hero;

      // TODO: will need to account for paralyzed as well
      if (hp > 0 && status === OK) {
        livingHeroes++;
      } else if (currentAnimation.type !== DYING && status !== DEAD) {
        dispatch(
          setEntityAnimation(
            { group: PLAYER_GROUP, index },
            { type: DYING, left: -1 } // TODO: -1 thing is kind of hacky, maybe formalize into a preservePosition flag
          )
        );
        await timeout(1000);
        dispatch(setEntityStatus({ group: PLAYER_GROUP, index }, DEAD));
        dispatch(setEntityAnimation({ group: PLAYER_GROUP, index }, IDLE));
      }
    }
    for (const [index, enemy] of leftEnemies.entities.entries()) {
      const { status, currentAnimation, hp } = enemy;

      if (hp > 0 && status === OK) {
        livingLeft++;
      } else if (currentAnimation.type !== DYING && status !== DEAD) {
        dispatch(setEntityAnimation({ group: LEFT_ENEMY_GROUP, index }, DYING));
        await timeout(1000);
        dispatch(setEntityStatus({ group: LEFT_ENEMY_GROUP, index }, DEAD));
        dispatch(setEntityAnimation({ group: LEFT_ENEMY_GROUP, index }, IDLE));
      }
    }
    for (const [index, enemy] of rightEnemies.entities.entries()) {
      const { status, currentAnimation, hp } = enemy;

      if (hp > 0 && status === OK) {
        livingRight++;
      } else if (currentAnimation.type !== DYING && status !== DEAD) {
        dispatch(
          setEntityAnimation({ group: RIGHT_ENEMY_GROUP, index }, DYING)
        );
        await timeout(1000);
        dispatch(setEntityStatus({ group: RIGHT_ENEMY_GROUP, index }, DEAD));
        dispatch(setEntityAnimation({ group: RIGHT_ENEMY_GROUP, index }, IDLE));
      }
    }

    await timeout(500);

    if (!livingHeroes) {
      dispatch(loseGame());
    } else if (!livingLeft && !livingRight) {
      dispatch(winGame());
    } else {
      dispatch(incrementQueueIndex());
      dispatch(setGameState(EXECUTING));
    }
  };
