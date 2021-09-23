import { EntityTypesEnum } from '../constants';
import { AppStateType, ActionType } from '../types';
import { generateHeroes, generateEnemies } from '../utils';
import { actionTypes } from '../actions';
const {
  START_NEW_GAME,
  GAME_OVER,
  SET_MESSAGE,
  SET_STATUS,
  DAMAGE,
  SET_ACTIVE_HERO,
  SET_TARGET_TYPE,
  QUEUE_ACTION,
} = actionTypes;
const { MONSTER, ROBOT } = EntityTypesEnum;

const reducer = (state: AppStateType, { type, payload }: ActionType) => {
  switch (type) {
    case SET_ACTIVE_HERO:
      return {
        ...state,
        activeHero: payload,
      };
    case SET_TARGET_TYPE:
      return {
        ...state,
        targetType: payload,
      };
    case QUEUE_ACTION:
      return {
        ...state,
        target: payload, // TODO: maybe don't even need this
        activeHero: null,
        queue: [...state.queue, payload],
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: payload,
      };
    case SET_STATUS: {
      const { targetGroup, targetIndex, status } = payload;
      // TODO
      // @ts-ignore
      const group = state.enemies[targetGroup];
      const newEntity = {
        ...group[targetIndex],
        status,
      };
      const newGroup = [
        ...group.slice(0, targetIndex),
        newEntity,
        ...group.slice(targetIndex + 1),
      ];

      return {
        ...state,
        enemies: {
          ...state.enemies,
          [targetGroup]: newGroup,
        },
      };
    }
    case DAMAGE: {
      const { targetGroup, targetIndex, attackPower } = payload;
      // TODO
      // @ts-ignore
      const group = state.enemies[targetGroup];
      const newEntity = {
        ...group[targetIndex],
        hp: group[targetIndex].hp - attackPower,
      };
      const newGroup = [
        ...group.slice(0, targetIndex),
        newEntity,
        ...group.slice(targetIndex + 1),
      ];

      return {
        ...state,
        enemies: {
          ...state.enemies,
          [targetGroup]: newGroup,
        },
      };
    }
    case START_NEW_GAME:
      // TODO: entities shouldn't be generated randomly here...
      return {
        ...state,
        heroes: generateHeroes(3),
        enemies: {
          left: generateEnemies(3, MONSTER),
          right: generateEnemies(3, ROBOT),
        },
      };
    case GAME_OVER:
      return {
        ...state,
        heroes: [],
        enemies: {
          left: [],
          right: [],
        },
      };
    default:
      return state;
  }
};

export default reducer;
