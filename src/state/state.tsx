import { createContext, Dispatch, useReducer } from 'react';

import { AppStateType, ActionType } from '../types';
import reducer from './reducer';

const initialState = {
  message: 'idle',
  heroes: [],
  enemies: { left: [], right: [] },
  activeHero: null,
  targetType: null,
  target: null,
  queue: [],
};

export const AppStateContext = createContext<[AppStateType, Dispatch<any>]>([
  initialState,
  () => null,
]);

// TODO
export const AppStateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let customDispatch = (action: ActionType | void) => {
    if (typeof action === 'function') {
      // @ts-ignore
      action(customDispatch);
    } else {
      // @ts-ignore
      dispatch(action);
    }
  };

  return (
    <AppStateContext.Provider value={[state, customDispatch]}>
      {children}
    </AppStateContext.Provider>
  );
};
