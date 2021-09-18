import { createContext, useReducer } from 'react';

import { EntityTypesEnum } from '../constants';
import { Entity } from '../types';
import { actionTypes } from '../actions';

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

const generateEntity = (
  name: string,
  type: EntityTypesEnum,
  maxHp: number,
  attack: number,
  defense: number,
  speed: number,
  inventory: object[]
) => ({
  name,
  type: type,
  maxHp: maxHp,
  hp: maxHp,
  attack: attack,
  defense: defense,
  speed: speed,
  inventory: inventory,
});

const generateHeroes = (count: number) => {
  const heroes: Entity[] = [];

  for (let i = 0; i < count; i++) {
    heroes.push(
      generateEntity(
        `hero-${Math.random()}`,
        EntityTypesEnum.HERO,
        10,
        1,
        3,
        1,
        []
      )
    );
  }

  return heroes;
};

const generateEnemies = (count: number, type: EntityTypesEnum) => {
  const enemies: Entity[] = [];

  for (let i = 0; i < count; i++) {
    enemies.push(
      generateEntity(`monster-${Math.random()}`, type, 10, 1, 3, 1, [])
    );
  }

  return enemies;
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
