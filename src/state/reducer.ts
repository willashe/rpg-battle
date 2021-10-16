import { AppStateType, ActionType } from '../types';
import { initialState } from './state';
import { actionTypes } from '../actions';
import { EntityTypesEnum, GameStatesEnum } from '../constants';
const {
  START_NEW_GAME,
  GAME_OVER,
  GAME_WON,
  GAME_LOST,
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
} = actionTypes;

const reducer = (state: AppStateType, action: ActionType) => {
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case SET_GAME_STATE:
      console.log(`SET_GAME_STATE: ${payload}`);
      return {
        ...state,
        gameState: payload,
      };
    case SET_ACTIVE_HERO:
      return {
        ...state,
        activeHero: payload,
      };
    case QUEUE_ACTION: {
      // TODO: this is broken right now, need to account for enemies in the queue
      const { heroIndex, target, actionCreator } = payload;
      const { queue } = state;

      return {
        ...state,
        activeHero: null,
        queue: [
          ...queue.slice(0, heroIndex),
          { target, actionCreator },
          ...queue.slice(heroIndex + 1),
        ],
      };
    }
    case SET_QUEUE_INDEX: {
      return {
        ...state,
        queueIndex: payload,
      };
    }
    case INCREMENT_QUEUE_INDEX: {
      return {
        ...state,
        queueIndex: state.queueIndex === null ? 0 : state.queueIndex + 1,
      };
    }
    case SET_PREV_QUEUE_INDEX: {
      return {
        ...state,
        prevQueueIndex: payload,
      };
    }
    case INCREMENT_PREV_QUEUE_INDEX: {
      return {
        ...state,
        prevQueueIndex:
          state.prevQueueIndex === null ? 0 : state.prevQueueIndex + 1,
      };
    }
    case SET_MESSAGE:
      return {
        ...state,
        message: payload,
      };
    case SET_STATUS: {
      const { targetGroup, targetIndex, status } = payload;

      // TODO: clean up code dup
      if (targetGroup === EntityTypesEnum.HERO) {
        const { heroes } = state;
        const newHero = {
          ...heroes[targetIndex],
          status,
        };
        const newHeroes = [
          ...heroes.slice(0, targetIndex),
          newHero,
          ...heroes.slice(targetIndex + 1),
        ];

        return {
          ...state,
          heroes: newHeroes,
        };
      } else {
        const group = state.enemies[targetGroup];
        const newEnemy = {
          ...group[targetIndex],
          status,
        };
        const newGroup = [
          ...group.slice(0, targetIndex),
          newEnemy,
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
    }
    case DAMAGE: {
      const { targetGroup, targetIndex, attackPower } = payload;

      // TODO: clean up code dup
      if (targetGroup === EntityTypesEnum.HERO) {
        const { heroes } = state;
        const newEntity = {
          ...heroes[targetIndex],
          hp: heroes[targetIndex].hp - attackPower,
        };
        const newHeroes = [
          ...heroes.slice(0, targetIndex),
          newEntity,
          ...heroes.slice(targetIndex + 1),
        ];

        return {
          ...state,
          heroes: newHeroes,
        };
      } else {
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
    }
    case START_NEW_GAME:
      return {
        ...state,
        ...payload,
      };
    case GAME_OVER:
      console.log('GAME_OVER');
      return {
        ...state,
        ...initialState,
      };
    case GAME_WON:
      console.log('GAME_WON');
      return {
        ...state,
        message: 'You win! :)',
        queueIndex: null,
        prevQueueIndex: null,
        gameState: GameStatesEnum.GAME_WON,
      };
    case GAME_LOST:
      console.log('GAME_LOST');
      return {
        ...state,
        message: 'You lose! :(',
        queueIndex: null,
        prevQueueIndex: null,
        gameState: GameStatesEnum.GAME_LOST,
      };
    default:
      return state;
  }
};

export default reducer;
