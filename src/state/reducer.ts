import { AppStateType, ActionType, TargetType, AnimationType } from '../types';
import { actionTypes } from '../actions';
import {
  EntityStatusesEnum,
  EXECUTING,
  GAME_LOST,
  GAME_WON,
  PLAYER_GROUP,
} from '../constants';
const {
  START_NEW_GAME,
  START_NEW_ROUND,
  WIN_GAME,
  LOSE_GAME,
  SET_QUEUE_INDEX,
  INCREMENT_QUEUE_INDEX,
  SET_GAME_STATE,
  SET_PLAYER_INTERRUPT,
  // SET_ACTIVE_HERO,
  QUEUE_ACTION,
  SET_GROUP_MESSAGE,
  SET_ENTITY_STATUS,
  SET_ENTITY_ANIMATION,
  ENTITY_DAMAGE,
} = actionTypes;

const reducer = (state: AppStateType, action: ActionType) => {
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case START_NEW_GAME: {
      return {
        ...state,
        ...payload,
      };
    }
    case START_NEW_ROUND: {
      return {
        ...state,
        gameState: EXECUTING,
        queueIndex: 0,
        queue: payload,
      };
    }
    case WIN_GAME: {
      console.log('WIN_GAME');
      return {
        ...state,
        gameState: GAME_WON,
        queueIndex: null,
      };
    }
    case LOSE_GAME: {
      console.log('LOSE_GAME');
      return {
        ...state,
        gameState: GAME_LOST,
        queueIndex: null,
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
    case SET_GAME_STATE: {
      console.log(`SET_GAME_STATE: ${payload}`);
      return {
        ...state,
        gameState: payload,
      };
    }
    case SET_PLAYER_INTERRUPT: {
      return {
        ...state,
        playerInterrupt: payload,
      };
    }
    case SET_GROUP_MESSAGE: {
      const {
        target: { group },
        message,
      }: { target: TargetType; message: string | number } = payload;

      return {
        ...state,
        groups: {
          ...state.groups,
          [group]: { ...state.groups[group], message },
        },
      };
    }
    case SET_ENTITY_STATUS: {
      const {
        target: { group, index },
        status,
      }: {
        target: TargetType;
        status: EntityStatusesEnum;
      } = payload;

      if (index === undefined) return state;

      const newEntity = {
        ...state.groups[group].entities[index],
        status,
      };
      const newGroupEntities = [
        ...state.groups[group].entities.slice(0, index),
        newEntity,
        ...state.groups[group].entities.slice(index + 1),
      ];

      return {
        ...state,
        groups: {
          ...state.groups,
          [group]: { ...state.groups[group], entities: newGroupEntities },
        },
      };
    }
    case SET_ENTITY_ANIMATION: {
      const {
        target: { group, index },
        animation,
      }: {
        target: TargetType;
        animation: AnimationType;
      } = payload;

      if (index === undefined) return state;

      const newEntity = {
        ...state.groups[group].entities[index],
        currentAnimation: animation,
      };
      const newGroupEntities = [
        ...state.groups[group].entities.slice(0, index),
        newEntity,
        ...state.groups[group].entities.slice(index + 1),
      ];

      return {
        ...state,
        groups: {
          ...state.groups,
          [group]: { ...state.groups[group], entities: newGroupEntities },
        },
      };
    }
    case ENTITY_DAMAGE: {
      const {
        target: { group, index },
        attackPower,
      }: { target: TargetType; attackPower: number } = payload;

      if (index === undefined) return state;

      const newEntity = {
        ...state.groups[group].entities[index],
        hp: state.groups[group].entities[index].hp - attackPower,
      };
      const newGroupEntities = [
        ...state.groups[group].entities.slice(0, index),
        newEntity,
        ...state.groups[group].entities.slice(index + 1),
      ];

      return {
        ...state,
        groups: {
          ...state.groups,
          [group]: { ...state.groups[group], entities: newGroupEntities },
        },
      };
    }
    // case SET_ACTIVE_HERO: {
    //   return {
    //     ...state,
    //     activeHero: payload,
    //   };
    // }
    case QUEUE_ACTION: {
      const { heroIndex: index, target, type } = payload;

      const newEntity = {
        ...state.groups[PLAYER_GROUP].entities[index],
        queuedAction: {
          type,
          target,
        },
      };
      const newGroupEntities = [
        ...state.groups[PLAYER_GROUP].entities.slice(0, index),
        newEntity,
        ...state.groups[PLAYER_GROUP].entities.slice(index + 1),
      ];

      return {
        ...state,
        groups: {
          ...state.groups,
          player: {
            ...state.groups[PLAYER_GROUP],
            entities: newGroupEntities,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
