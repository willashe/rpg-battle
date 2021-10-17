import { AppStateType, ActionType } from '../types';
import { initialState } from './state';
import { actionTypes } from '../actions';
import { EntityTypesEnum, GameStatesEnum } from '../constants';
const {
  START_NEW_GAME,
  START_NEW_ROUND,
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
  SET_PLAYER_INTERRUPT,
} = actionTypes;

const reducer = (state: AppStateType, action: ActionType) => {
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case SET_PLAYER_INTERRUPT: {
      return {
        ...state,
        playerInterrupt: payload,
      };
    }
    case START_NEW_ROUND: {
      return {
        ...state,
        queue: payload,
        queueIndex: 0,
        gameState: GameStatesEnum.EXECUTING,
      };
    }
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
      const { heroes } = state;

      return {
        ...state,
        activeHero: null,
        heroes: [
          ...heroes.slice(0, heroIndex),
          {
            ...heroes[heroIndex],
            queuedActions: [
              // TODO: loop over equipped weapons here if physical attack?
              {
                actor: { group: EntityTypesEnum.HERO, index: heroIndex },
                target,
                actionCreator,
              },
            ],
          },
          ...heroes.slice(heroIndex + 1),
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
    case SET_ENEMY_MESSAGE:
      const { targetGroup, message } = payload;

      return {
        ...state,
        enemies: {
          ...state.enemies,
          [targetGroup]: {
            ...state.enemies[targetGroup],
            message,
          },
        },
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
        const { entities } = group;
        const newEnemy = {
          ...entities[targetIndex],
          status,
        };
        const newGroup = {
          ...group,
          entities: [
            ...entities.slice(0, targetIndex),
            newEnemy,
            ...entities.slice(targetIndex + 1),
          ],
        };

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
        const { entities } = group;
        const newEntity = {
          ...entities[targetIndex],
          hp: entities[targetIndex].hp - attackPower,
        };
        const newGroup = {
          ...group,
          entities: [
            ...entities.slice(0, targetIndex),
            newEntity,
            ...entities.slice(targetIndex + 1),
          ],
        };

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
