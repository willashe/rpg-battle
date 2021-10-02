import { createContext, Dispatch, useReducer } from 'react';

import { AppStateType } from '../types';
import reducer from './reducer';

const initialState = {
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

export const AppStateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={[state, dispatch]}>
      {children}
    </AppStateContext.Provider>
  );
};

export const AppStateContext = createContext<[AppStateType, Dispatch<any>]>([
  initialState,
  () => null,
]);
