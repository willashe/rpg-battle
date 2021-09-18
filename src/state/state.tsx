import { createContext, useReducer } from 'react';

import { EntityTypesEnum } from '../constants';
import { Entity } from '../types';
import { actionTypes } from '../actions';
import { generateHeroes, generateEnemies } from '../utils';

const { START_NEW_GAME, GAME_OVER } = actionTypes;

interface AppState {
  heroes: Entity[];
  enemies: { left: Entity[]; right: Entity[] };
}

interface Action {
  type: string;
  payload?: any;
}

const reducer = (state: AppState, { type, payload }: Action) => {
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

export const initialState = {
  heroes: [],
  enemies: { left: [], right: [] },
};

export const AppStateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={[state, dispatch]}>
      {children}
    </AppStateContext.Provider>
  );
};

export const AppStateContext = createContext<(AppState | any)[]>(null!);
