import { createContext, Dispatch, useReducer, useCallback } from 'react';

import { AppStateType, ActionType } from '../types';
import reducer from './reducer';

export const initialState = {
  gameState: 'INIT',
  message: 'idle',
  heroes: [],
  enemies: { left: [], right: [] },
  activeHero: null,
  queue: [],
  queueIndex: null,
  prevQueueIndex: null,
};

export const AppStateContext = createContext<[AppStateType, Dispatch<any>]>([
  initialState,
  () => null,
]);

// TODO
export const AppStateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let customDispatch = useCallback((action: ActionType | void) => {
    if (typeof action === 'function') {
      // @ts-ignore
      action(customDispatch);
    } else {
      // @ts-ignore
      dispatch(action);
    }
  }, []);

  return (
    <AppStateContext.Provider value={[state, customDispatch]}>
      {children}
    </AppStateContext.Provider>
  );
};
