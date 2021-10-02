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
        heroes: generateHeroes(4),
        enemies: {
          left: {
            name: EntityTypesEnum.MONSTER,
            entities: generateEnemies(3),
          },
          right: {
            name: EntityTypesEnum.ROBOT,
            entities: generateEnemies(3),
          },
        },
      };
    case GAME_OVER:
      return {
        ...state,
        heroes: [],
        enemies: {
          left: {
            name: '',
            entities: [],
          },
          right: {
            name: '',
            entities: [],
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
