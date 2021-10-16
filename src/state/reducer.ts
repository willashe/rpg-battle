import { AppStateType, ActionType } from '../types';
import { initialState } from './state';
import { actionTypes } from '../actions';
const {
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
} = actionTypes;

const reducer = (state: AppStateType, { type, payload }: ActionType) => {
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
    default:
      return state;
  }
};

export default reducer;
