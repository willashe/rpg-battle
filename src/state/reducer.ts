import { EntityTypesEnum } from '../constants';
import { AppStateType, ActionType } from '../types';
import { generateHeroes, generateEnemies } from '../utils';
import { actionTypes } from '../actions';
const { START_NEW_GAME, GAME_OVER } = actionTypes;

const reducer = (state: AppStateType, { type, payload }: ActionType) => {
  switch (type) {
    case START_NEW_GAME:
      return {
        ...state,
        heroes: generateHeroes(3),
        enemies: {
          left: generateEnemies(3, EntityTypesEnum.MONSTER),
          right: generateEnemies(3, EntityTypesEnum.ROBOT),
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
